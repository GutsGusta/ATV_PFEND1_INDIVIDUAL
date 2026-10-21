export function criarIngressoControlador({ ingressoServico }) {
    async function comprar(req, res, next) {
        try {
            const pedido = await ingressoServico.comprar(req.body, req.usuario);
            res.status(201).json({ sucesso: true, dados: pedido });
        } catch (erro) {
            if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
            if (erro.message.includes('não encontrado')) return res.status(404).json({ sucesso: false, erro: erro.message });
            next(erro);
        }
    }
    async function listarMeus(req, res, next) {
        try {
            const pedidos = await ingressoServico.listarDoUsuario(req.usuario.id);
            res.status(200).json({ sucesso: true, dados: pedidos });
        } catch (erro) {
            next(erro);
        }
    }
    return { comprar, listarMeus };
}
