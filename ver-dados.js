// Exemplo simples para ver dados do banco
const mysql = require('mysql2');

// Configuração do banco
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // sua senha
    database: 'inkflowstudios'
});

// Ver usuários
db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
        console.log('Erro:', err);
        return;
    }
    console.log('=== USUÁRIOS ===');
    console.table(results);
});

// Ver clientes
db.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
        console.log('Erro:', err);
        return;
    }
    console.log('=== CLIENTES ===');
    console.table(results);
});

// Ver agendamentos
db.query(`
    SELECT a.*, c.nome as cliente_nome, ar.nome as artista_nome 
    FROM agendamentos a 
    JOIN clientes c ON a.cliente_id = c.id 
    JOIN artistas ar ON a.artista_id = ar.id
`, (err, results) => {
    if (err) {
        console.log('Erro:', err);
        return;
    }
    console.log('=== AGENDAMENTOS ===');
    console.table(results);
    
    db.end();
});