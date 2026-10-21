export function criarIngressoServico({ showModelo, ingressoModelo }) {
    async function comprar(dados, usuario) {
        const showId = Number(dados.showId);
        const quantidade = Number(dados.quantidade);

        if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 8) {
            throw new TypeError('Escolha de 1 a 8 ingressos');
        }

        const show = await showModelo.buscarPorId(showId);
        if (!show) throw new Error('Show não encontrado');

        return ingressoModelo.criar({
            usuarioId: usuario.id,
            showId: show.id,
            quantidade,
            total: show.preco * quantidade
        });
    }
    async function listarDoUsuario(usuarioId) {
        return ingressoModelo.listarPorUsuario(usuarioId);
    }
    return { comprar, listarDoUsuario };
}
