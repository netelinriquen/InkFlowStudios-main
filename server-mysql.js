const http = require('http');
const mysql = require('mysql2');

const PORT = 3000;

// Conexão MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // sua senha
    database: 'inkflowstudios'
});

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    
    // Criar usuário
    if (req.method === 'POST' && url.pathname === '/users') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const userData = JSON.parse(body);
            
            db.query(
                'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
                [userData.name, userData.email, userData.password],
                (err, result) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: err.message }));
                        return;
                    }
                    
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        id: result.insertId, 
                        message: 'Usuário criado!' 
                    }));
                }
            );
        });
        return;
    }

    // Listar usuários
    if (req.method === 'GET' && url.pathname === '/users') {
        db.query('SELECT id, nome, email, criado_em FROM usuarios', (err, results) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
        return;
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor MySQL rodando na porta ${PORT}`);
});