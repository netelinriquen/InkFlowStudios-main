const http = require('http');
const sql = require('mssql');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

// Configuração SQL Server
const config = {
    user: 'mzx1212_SQLLogin_1',
    password: 'in2y563ik8', // coloque sua senha aqui
    server: 'INKFLOW.mssql.somee.com',
    database: 'INKFLOW',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    
    // Teste de conexão
    if (req.method === 'GET' && url.pathname === '/test') {
        try {
            await sql.connect(config);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                status: 'success', 
                message: 'SQL Server conectado!'
            }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
        return;
    }

    // Criar usuário (várias rotas possíveis)
    if (req.method === 'POST' && (url.pathname === '/users' || url.pathname === '/api/users' || url.pathname === '/register' || url.pathname === '/signup')) {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                await sql.connect(config);
                const userData = JSON.parse(body);
                console.log('Dados recebidos:', userData);
                
                // Criar tabela se não existir
                const createTable = new sql.Request();
                await createTable.query(`
                    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='usuarios' AND xtype='U')
                    CREATE TABLE usuarios (
                        id INT IDENTITY(1,1) PRIMARY KEY,
                        nome NVARCHAR(100) NOT NULL,
                        email NVARCHAR(100) NOT NULL,
                        senha NVARCHAR(255) NOT NULL,
                        criado_em DATETIME DEFAULT GETDATE()
                    )
                `);
                
                const request = new sql.Request();
                const result = await request
                    .input('nome', sql.NVarChar, userData.name)
                    .input('email', sql.NVarChar, userData.email)
                    .input('senha', sql.NVarChar, userData.password)
                    .query('INSERT INTO usuarios (nome, email, senha) VALUES (@nome, @email, @senha)');
                
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Usuário criado!' }));
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }

    // Login de usuário
    if (req.method === 'POST' && (url.pathname === '/login' || url.pathname === '/api/login' || url.pathname === '/auth/login')) {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                await sql.connect(config);
                const loginData = JSON.parse(body);
                console.log('Tentativa de login:', loginData.email);
                
                const request = new sql.Request();
                const result = await request
                    .input('email', sql.NVarChar, loginData.email)
                    .input('senha', sql.NVarChar, loginData.password)
                    .query('SELECT id, nome, email, criado_em FROM usuarios WHERE email = @email AND senha = @senha');
                
                if (result.recordset.length > 0) {
                    const user = result.recordset[0];
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: true, 
                        user: user,
                        message: 'Login realizado com sucesso!' 
                    }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: false, 
                        message: 'Email ou senha inválidos' 
                    }));
                }
            } catch (error) {
                console.error('Erro no login:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }

    // Listar usuários (várias rotas possíveis)
    if (req.method === 'GET' && (url.pathname === '/users' || url.pathname === '/api/users')) {
        try {
            await sql.connect(config);
            const request = new sql.Request();
            const result = await request.query('SELECT id, nome, email, criado_em FROM usuarios');
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.recordset));
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message, users: [] }));
        }
        return;
    }

    // Criar agendamento
    if (req.method === 'POST' && url.pathname === '/appointments') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                await sql.connect(config);
                const data = JSON.parse(body);
                
                // Criar tabela se não existir
                const createTable = new sql.Request();
                await createTable.query(`
                    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='agendamentos' AND xtype='U')
                    CREATE TABLE agendamentos (
                        id INT IDENTITY(1,1) PRIMARY KEY,
                        cliente_nome NVARCHAR(100) NOT NULL,
                        telefone NVARCHAR(20),
                        email NVARCHAR(100),
                        idade INT,
                        servico NVARCHAR(200),
                        data_agendamento DATE,
                        horario NVARCHAR(10),
                        artista NVARCHAR(100),
                        tamanho NVARCHAR(50),
                        local_corpo NVARCHAR(100),
                        descricao NVARCHAR(MAX),
                        orcamento NVARCHAR(50),
                        primeira_tatuagem BIT DEFAULT 0,
                        status NVARCHAR(20) DEFAULT 'pendente',
                        preco DECIMAL(10,2) DEFAULT 0,
                        criado_em DATETIME DEFAULT GETDATE()
                    )
                `);
                
                console.log('Dados recebidos para agendamento:', data);
                
                const request = new sql.Request();
                await request
                    .input('cliente_nome', sql.NVarChar, data.clientName || data.name)
                    .input('telefone', sql.NVarChar, data.phone)
                    .input('email', sql.NVarChar, data.email)
                    .input('idade', sql.Int, data.age ? parseInt(data.age) : null)
                    .input('servico', sql.NVarChar, data.service)
                    .input('data_agendamento', sql.Date, data.date)
                    .input('horario', sql.Time, data.time)
                    .input('artista', sql.NVarChar, data.artist || 'Sem preferência')
                    .input('tamanho', sql.NVarChar, data.size)
                    .input('local_corpo', sql.NVarChar, data.location)
                    .input('descricao', sql.NVarChar, data.description)
                    .input('orcamento', sql.NVarChar, data.budget)
                    .input('primeira_tatuagem', sql.Bit, data.firstTattoo ? 1 : 0)
                    .input('preco', sql.Decimal, data.price || 0)
                    .query(`INSERT INTO agendamentos 
                            (cliente_nome, telefone, email, idade, servico, data_agendamento, horario, artista, tamanho, local_corpo, descricao, orcamento, primeira_tatuagem, preco) 
                            VALUES 
                            (@cliente_nome, @telefone, @email, @idade, @servico, @data_agendamento, @horario, @artista, @tamanho, @local_corpo, @descricao, @orcamento, @primeira_tatuagem, @preco)`);
                
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Agendamento criado com sucesso!', success: true }));
            } catch (error) {
                console.error('Erro ao criar agendamento:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }

    // Listar agendamentos
    if (req.method === 'GET' && url.pathname === '/appointments') {
        try {
            await sql.connect(config);
            const request = new sql.Request();
            const result = await request.query('SELECT * FROM agendamentos ORDER BY data_agendamento, horario');
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.recordset));
        } catch (error) {
            console.error('Erro ao listar agendamentos:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message, appointments: [] }));
        }
        return;
    }

    // Servir arquivos estáticos
    if (req.method === 'GET') {
        let filePath = url.pathname;
        
        // Se for a raiz, servir index.html
        if (filePath === '/') {
            filePath = '/index.html';
        }
        
        // Tentar diferentes caminhos
        const possiblePaths = [
            path.join(__dirname, filePath),
            path.join(__dirname, 'pages', filePath),
            path.join(__dirname, 'assets', filePath),
            path.join(__dirname, 'assets', 'css', filePath),
            path.join(__dirname, 'assets', 'js', filePath),
            path.join(__dirname, 'assets', 'images', filePath)
        ];
        
        for (const fullPath of possiblePaths) {
            if (fs.existsSync(fullPath)) {
                const ext = path.extname(fullPath);
                const contentType = {
                    '.html': 'text/html',
                    '.css': 'text/css',
                    '.js': 'text/javascript',
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.gif': 'image/gif',
                    '.ico': 'image/x-icon'
                }[ext] || 'text/plain';
                
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(fs.readFileSync(fullPath));
                return;
            }
        }
    }
    
    // 404 - Rota não encontrada
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor SQL Server na porta ${PORT}`);
    console.log(`📊 Teste: http://localhost:${PORT}/test`);
});