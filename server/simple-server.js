const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const dbPath = path.join(__dirname, 'db.json');

// Ler dados do banco
function readDB() {
    try {
        return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch (error) {
        return { users: [], appointments: [], artists: [], services: [], portfolio: [], settings: {} };
    }
}

// Salvar dados no banco
function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Responder OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const db = readDB();

    // GET /users
    if (req.method === 'GET' && url.pathname === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(db.users || []));
        return;
    }

    // POST /users
    if (req.method === 'POST' && url.pathname === '/users') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const userData = JSON.parse(body);
            userData.id = Date.now();
            userData.createdAt = new Date().toISOString();
            db.users = db.users || [];
            db.users.push(userData);
            writeDB(db);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(userData));
        });
        return;
    }

    // 404
    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Usuários: http://localhost:${PORT}/users`);
});