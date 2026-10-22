<<<<<<< HEAD
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
=======
import { app } from './app.js';
import { testarConexao, configuracaoBanco } from './dados/conexao.js';

const porta = process.env.PORT || 3001;

app.listen(porta, async () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
    try {
        const nome = await testarConexao();
        console.log(`Conectado ao banco "${nome}" em ${configuracaoBanco.host}:${configuracaoBanco.port}`);
    } catch (erro) {
        console.error(`Não foi possível conectar ao banco (${configuracaoBanco.host}:${configuracaoBanco.port}): ${erro.message}`);
        console.error('Confira se o MySQL está ligado e se o banco/usuário/senha estão corretos.');
    }
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
});
