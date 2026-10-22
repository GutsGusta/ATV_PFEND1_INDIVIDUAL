import { carregarAmbiente } from './config/ambiente.js';

const config = carregarAmbiente('.env');

const { app, pool } = await import('./app.js');
const porta = config.porta || 3001;

try {
    await pool.query('SELECT 1');
    console.log('Banco de dados conectado');
} catch (erro) {
    console.error(`Não foi possível conectar ao banco de dados: ${erro.message}`);
    process.exit(1);
}

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
