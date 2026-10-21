import { lerToken, guardarToken, apagarToken } from '../utilitarios/cookie.js';

export function criarAutenticacaoControlador({ autenticacaoServico }) {
    function tratarErro(erro, res, next) {
        if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
        if (erro.message.includes('já cadastrado')) return res.status(409).json({ sucesso: false, erro: erro.message });
        if (erro.message.includes('incorretos')) return res.status(401).json({ sucesso: false, erro: erro.message });
        next(erro);
    }
    async function cadastrar(req, res, next) {
        try {
            const { usuario, token } = await autenticacaoServico.cadastrar(req.body);
            guardarToken(res, token);
            res.status(201).json({ sucesso: true, dados: usuario });
        } catch (erro) {
            tratarErro(erro, res, next);
        }
    }
    async function entrar(req, res, next) {
        try {
            const { usuario, token } = await autenticacaoServico.entrar(req.body);
            guardarToken(res, token);
            res.status(200).json({ sucesso: true, dados: usuario });
        } catch (erro) {
            tratarErro(erro, res, next);
        }
    }
    async function sair(req, res, next) {
        try {
            await autenticacaoServico.sair(lerToken(req));
            apagarToken(res);
            res.status(200).json({ sucesso: true });
        } catch (erro) {
            next(erro);
        }
    }
    function eu(req, res) {
        res.status(200).json({ sucesso: true, dados: req.usuario });
    }
    return { cadastrar, entrar, sair, eu };
}
