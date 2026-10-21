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
});
