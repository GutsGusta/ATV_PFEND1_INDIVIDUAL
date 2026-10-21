export function criarShowControlador({ showServico }) {
    async function listar(req, res, next) {
        try {
            const shows = await showServico.listar();
            res.status(200).json({ sucesso: true, dados: shows });
        } catch (erro) {
            next(erro);
        }
    }
    async function buscar(req, res, next) {
        try {
            const show = await showServico.buscarPorId(req.params.id);
            res.status(200).json({ sucesso: true, dados: show });
        } catch (erro) {
            if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
            if (erro.message.includes('não encontrado')) return res.status(404).json({ sucesso: false, erro: erro.message });
            next(erro);
        }
    }
    return { listar, buscar };
}
