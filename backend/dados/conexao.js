import mysql from 'mysql2/promise';

export const configuracaoBanco = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306, 
    database: process.env.DB_NOME || 'db_starticket',
    user: process.env.DB_USUARIO || 'adm',
    password: process.env.DB_SENHA || '123'
};

export const banco = mysql.createPool({
    ...configuracaoBanco,
    waitForConnections: true,
    connectionLimit: 10,
    timezone: '-03:00',      
    decimalNumbers: true     
});

banco.pool.on('connection', (conexao) => {
    conexao.query("SET time_zone = '-03:00'");
});

export async function testarConexao() {
    const [linhas] = await banco.query('SELECT DATABASE() AS banco');
    return linhas[0].banco;
}
