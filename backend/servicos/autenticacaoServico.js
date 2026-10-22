function mostrarUsuario(usuario) {
    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
}

export function criarAutenticacaoServico({ usuarioModelo, sessaoModelo }) {
    async function cadastrar({ nome, email, senha }) {
        const nomeLimpo = typeof nome === 'string' ? nome.trim() : '';
        const emailLimpo = typeof email === 'string' ? email.trim().toLowerCase() : '';

        if (nomeLimpo.length < 2) throw new TypeError('Informe seu nome');
        if (!/^\S+@\S+\.\S+$/.test(emailLimpo)) throw new TypeError('Informe um e-mail válido');
        if (typeof senha !== 'string' || senha.length < 6) {
            throw new TypeError('A senha deve ter no mínimo 6 caracteres');
        }
        if (await usuarioModelo.buscarPorEmail(emailLimpo)) throw new Error('E-mail já cadastrado');

        const usuario = await usuarioModelo.criar({
            nome: nomeLimpo,
            email: emailLimpo,
            senha
        });
        return { usuario: mostrarUsuario(usuario), token: sessaoModelo.criar(usuario.id) };
    }
    async function entrar({ email, senha }) {
        const emailLimpo = typeof email === 'string' ? email.trim().toLowerCase() : '';
        const usuario = await usuarioModelo.buscarPorEmail(emailLimpo);

        if (!usuario || typeof senha !== 'string' || usuario.senha !== senha) {
            throw new Error('E-mail ou senha incorretos');
        }
        return { usuario: mostrarUsuario(usuario), token: sessaoModelo.criar(usuario.id) };
    }
    function sair(token) {
        if (token) sessaoModelo.remover(token);
    }
    async function buscarPorToken(token) {
        const usuarioId = token ? sessaoModelo.buscar(token) : null;
        if (!usuarioId) return null;
        const usuario = await usuarioModelo.buscarPorId(usuarioId);
        return usuario ? mostrarUsuario(usuario) : null;
    }
    return { cadastrar, entrar, sair, buscarPorToken };
}
