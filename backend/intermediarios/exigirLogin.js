import { lerToken } from '../utilitarios/cookie.js';

export function criarExigirLogin({ autenticacaoServico }) {
    return async function exigirLogin(req, res, next) {
        try {
            const usuario = await autenticacaoServico.buscarPorToken(lerToken(req));
            if (!usuario) {
                return res.status(401).json({ sucesso: false, erro: 'Faça login para continuar' });
            }
            req.usuario = usuario;
            next();
        } catch (erro) {
            next(erro);
        }
    };
}
