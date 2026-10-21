import express from 'express';

export function criarIngressoRotas({ ingressoControlador, exigirLogin }) {
    const router = express.Router();

    router.post('/', exigirLogin, ingressoControlador.comprar);
    router.get('/meus', exigirLogin, ingressoControlador.listarMeus);
    return router;
}
