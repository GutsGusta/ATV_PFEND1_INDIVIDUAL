import express from 'express';

export function criarShowRotas({ showControlador }) {
    const router = express.Router();

    router.get('/', showControlador.listar);
    router.get('/:id', showControlador.buscar);
    return router;
}
