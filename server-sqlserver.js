const http = require('http');
const sql = require('mssql');

const PORT = 3000;

// Configuração SQL Server
const config = {
    user: 'sa', // seu usuário
    password: '', // sua senha
    server: 'localhost',
    database: 'inkflowstudios',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const server = http.createServer(async (req, res) => {
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
        // Conectar ao SQL Server
        await sql.connect(config);
        
        // Teste
        if (req.method === 'GET' && url.pathname === '/test') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                status: 'success', 
                message: 'SQL Server conectado!',
                database: 'SQL Server Database'
            }));
            return;
        }

        // Criar usuário
        if (req.method === 'POST' && url.pathname === '/users') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const userData = JSON.parse(body);
                
                const request = new sql.Request();
                const result = await request
                    .input('nome', sql.NVarChar, userData.name)
                    .input('email', sql.NVarChar, userData.email)
                    .input('senha', sql.NVarChar, userData.password)
                    .query('INSERT INTO usuarios (nome, email, senha) VALUES (@nome, @email, @senha)');
                
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Usuário criado!' }));
            });
            return;
        }

        // Listar usuários
        if (req.method === 'GET' && url.pathname === '/users') {
            const request = new sql.Request();
            const result = await request.query('SELECT id, nome, email, criado_em FROM usuarios');
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.recordset));
            return;
        }

    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor SQL Server na porta ${PORT}`);
});