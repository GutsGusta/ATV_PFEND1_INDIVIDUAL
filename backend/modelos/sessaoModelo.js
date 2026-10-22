<<<<<<< HEAD
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
=======
import crypto from 'node:crypto';
import { banco } from '../dados/conexao.js';

export function criarSessaoModelo() {
    async function criar(usuarioId) {
        const token = crypto.randomBytes(32).toString('hex');
        await banco.query('INSERT INTO sessoes (token, usuario_id) VALUES (?, ?)', [token, usuarioId]);
        return token;
    }
    async function buscar(token) {
        const [linhas] = await banco.query(
            'SELECT usuario_id FROM sessoes WHERE token = ? AND criado_em > NOW() - INTERVAL 7 DAY',
            [token]
        );
        return linhas[0] ? linhas[0].usuario_id : null;
    }
    async function remover(token) {
        await banco.query('DELETE FROM sessoes WHERE token = ?', [token]);
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
    }
    return { criar, buscar, remover };
}
