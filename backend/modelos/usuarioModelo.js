import { banco } from '../dados/conexao.js';

export function criarUsuarioModelo() {
    async function criar({ nome, email, senha }) {
        try {
            const [resultado] = await banco.query(
                'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
                [nome, email, senha]
            );
            return { id: resultado.insertId, nome, email, senha };
        } catch (erro) {
            if (erro.code === 'ER_DUP_ENTRY') throw new Error('E-mail já cadastrado');
            throw erro;
        }
    }
    async function buscarPorEmail(email) {
        const [linhas] = await banco.query(
            'SELECT id, nome, email, senha FROM usuarios WHERE email = ?',
            [email]
        );
        return linhas[0] || null;
    }
    async function buscarPorId(id) {
        const [linhas] = await banco.query(
            'SELECT id, nome, email, senha FROM usuarios WHERE id = ?',
            [id]
        );
        return linhas[0] || null;
    }
    return { criar, buscarPorEmail, buscarPorId };
}
