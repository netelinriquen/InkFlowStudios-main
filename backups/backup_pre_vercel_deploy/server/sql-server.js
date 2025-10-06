const http = require('http');
const sql = require('mssql');

const PORT = 3000;

// Configuração do SQL Server
const config = {
    user: 'sa', // ou seu usuário
    password: 'sua_senha', // sua senha
    server: 'localhost', // ou seu servidor
    database: 'inkflow_studios',
    options: {
        encrypt: false, // para desenvolvimento local
        trustServerCertificate: true
    }
};

// Pool de conexões
let pool;

async function initDB() {
    try {
        pool = await sql.connect(config);
        console.log('✅ Conectado ao SQL Server');
    } catch (err) {
        console.error('❌ Erro ao conectar SQL Server:', err.message);
        process.exit(1);
    }
}

const server = http.createServer(async (req, res) => {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    
    try {
        // GET /users
        if (req.method === 'GET' && url.pathname === '/users') {
            const result = await pool.request().query('SELECT id, name, email, phone, birth_date, created_at FROM users WHERE is_admin = 0');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.recordset));
            return;
        }

        // POST /users (registro)
        if (req.method === 'POST' && url.pathname === '/users') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const userData = JSON.parse(body);
                const result = await pool.request()
                    .input('name', sql.VarChar, userData.name)
                    .input('email', sql.VarChar, userData.email)
                    .input('password', sql.VarChar, userData.password)
                    .input('phone', sql.VarChar, userData.phone)
                    .input('birth_date', sql.Date, userData.birth)
                    .query(`INSERT INTO users (name, email, password, phone, birth_date) 
                           OUTPUT INSERTED.id, INSERTED.name, INSERTED.email, INSERTED.phone, INSERTED.birth_date, INSERTED.created_at
                           VALUES (@name, @email, @password, @phone, @birth_date)`);
                
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result.recordset[0]));
            });
            return;
        }

        // GET /artists
        if (req.method === 'GET' && url.pathname === '/artists') {
            const result = await pool.request().query('SELECT * FROM artists WHERE status = \'ativo\'');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.recordset));
            return;
        }

        // POST /appointments
        if (req.method === 'POST' && url.pathname === '/appointments') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const appointmentData = JSON.parse(body);
                const result = await pool.request()
                    .input('name', sql.VarChar, appointmentData.name)
                    .input('email', sql.VarChar, appointmentData.email)
                    .input('phone', sql.VarChar, appointmentData.phone)
                    .input('service', sql.VarChar, appointmentData.service)
                    .input('description', sql.Text, appointmentData.description)
                    .input('appointment_date', sql.Date, appointmentData.date)
                    .input('appointment_time', sql.Time, appointmentData.time)
                    .input('artist_id', sql.Int, appointmentData.artist)
                    .query(`INSERT INTO appointments (name, email, phone, service, description, appointment_date, appointment_time, artist_id) 
                           OUTPUT INSERTED.*
                           VALUES (@name, @email, @phone, @service, @description, @appointment_date, @appointment_time, @artist_id)`);
                
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result.recordset[0]));
            });
            return;
        }

        // 404
        res.writeHead(404);
        res.end('Not Found');

    } catch (error) {
        console.error('Erro na requisição:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
});

// Inicializar
initDB().then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 Servidor SQL Server rodando na porta ${PORT}`);
        console.log(`📊 Usuários: http://localhost:${PORT}/users`);
        console.log(`👨‍🎨 Artistas: http://localhost:${PORT}/artists`);
    });
});

process.on('SIGINT', async () => {
    if (pool) await pool.close();
    process.exit(0);
});