const sql = require('mssql');

const config = {
    user: 'mzx1212_SQLLogin_1',
    password: 'in2y563ik8',
    server: 'INKFLOW.mssql.somee.com',
    database: 'INKFLOW',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function debug() {
    try {
        console.log('🔄 Conectando ao SQL Server...');
        await sql.connect(config);
        console.log('✅ Conectado!');
        
        console.log('🔍 Verificando tabelas...');
        const request = new sql.Request();
        const tables = await request.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'");
        console.log('📋 Tabelas encontradas:', tables.recordset);
        
        console.log('👥 Verificando usuários...');
        const users = await request.query('SELECT * FROM usuarios');
        console.log('Usuários:', users.recordset);
        
    } catch (err) {
        console.error('❌ Erro:', err.message);
    }
}

debug();