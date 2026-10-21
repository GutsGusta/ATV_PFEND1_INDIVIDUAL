import { banco } from '../dados/conexao.js';

const consultaBase = `
    SELECT
        i.id,
        i.usuario_id AS usuarioId,
        i.show_id AS showId,
        s.titulo,
        s.artista,
        s.data_show AS dataShow,
        s.\`local\`,
        s.cidade,
        i.quantidade,
        i.total,
        CONCAT('STAR-', LPAD(i.id, 5, '0')) AS codigo,
        i.criado_em AS criadoEm
    FROM ingressos i
    JOIN shows s ON s.id = i.show_id`;

export function criarIngressoModelo() {
    async function criar({ usuarioId, showId, quantidade, total }) {
        const [inserido] = await banco.query(
            'INSERT INTO ingressos (usuario_id, show_id, quantidade, total) VALUES (?, ?, ?, ?)',
            [usuarioId, showId, quantidade, total]
        );
        const [linhas] = await banco.query(`${consultaBase} WHERE i.id = ?`, [inserido.insertId]);
        return linhas[0];
    }
    async function listarPorUsuario(usuarioId) {
        const [linhas] = await banco.query(
            `${consultaBase} WHERE i.usuario_id = ? ORDER BY i.id DESC`,
            [usuarioId]
        );
        return linhas;
    }
    return { criar, listarPorUsuario };
}
