<<<<<<< HEAD
export function criarUsuarioModelo({ pool }) {
    async function criar(usuario) {
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        const [resultado] = await pool.query(sql, [usuario.nome, usuario.email, usuario.senha]);
        return { ...usuario, id: resultado.insertId };
    }
    async function buscarPorEmail(email) {
        const [linhas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return linhas[0] || null;
    }
    async function buscarPorId(id) {
        const [linhas] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
=======
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
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
        return linhas[0] || null;
    }
    return { criar, buscarPorEmail, buscarPorId };
}
