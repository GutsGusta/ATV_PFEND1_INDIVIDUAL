export function criarSessaoModelo() {
    const sessoes = new Map();

    function criar(usuarioId) {
        const token = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
        sessoes.set(token, usuarioId);
        return token;
    }
    function buscar(token) {
        return sessoes.get(token) || null;
    }
    function remover(token) {
        sessoes.delete(token);
    }
    return { criar, buscar, remover };
}
