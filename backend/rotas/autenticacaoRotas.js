import express from 'express';

export function criarAutenticacaoRotas({ autenticacaoControlador, exigirLogin }) {
    const router = express.Router();

    router.post('/cadastro', autenticacaoControlador.cadastrar);
    router.post('/entrar', autenticacaoControlador.entrar);
    router.post('/sair', autenticacaoControlador.sair);
    router.get('/eu', exigirLogin, autenticacaoControlador.eu);
    return router;
}
