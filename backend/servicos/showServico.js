export function criarShowServico({ showModelo }) {
    async function listar() {
        const shows = await showModelo.listarTodos();
        return [...shows].sort((a, b) => new Date(a.data) - new Date(b.data));
    }
    async function buscarPorId(idRecebido) {
        const id = Number(idRecebido);
        if (!Number.isInteger(id) || id <= 0) {
            throw new TypeError('ID deve ser um número inteiro positivo');
        }
        const show = await showModelo.buscarPorId(id);
        if (!show) throw new Error(`Show ${id} não encontrado`);
        return show;
    }
    return { listar, buscarPorId };
}
