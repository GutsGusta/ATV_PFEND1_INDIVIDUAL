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
    }
    return { criar, buscar, remover };
}
