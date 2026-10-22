<<<<<<< HEAD
function converter(linha) {
    return {
        id: linha.id,
        codigo: linha.codigo,
        usuarioId: linha.usuario_id,
        showId: linha.show_id,
        titulo: linha.titulo,
        artista: linha.artista,
        dataShow: linha.data_show,
        local: linha.local_show,
        cidade: linha.cidade,
        quantidade: linha.quantidade,
        total: Number(linha.total),
        criadoEm: linha.criado_em
    };
}

export function criarIngressoModelo({ pool }) {
    async function criar(pedido) {
        const sql = 'INSERT INTO pedidos (usuario_id, show_id, quantidade, total) VALUES (?, ?, ?, ?)';
        const [resultado] = await pool.query(sql, [pedido.usuarioId, pedido.showId, pedido.quantidade, pedido.total]);
        const codigo = `STAR-${String(resultado.insertId).padStart(5, '0')}`;
        await pool.query('UPDATE pedidos SET codigo = ? WHERE id = ?', [codigo, resultado.insertId]);
        return { ...pedido, id: resultado.insertId, codigo, criadoEm: new Date() };
    }
    async function listarPorUsuario(usuarioId) {
        const sql = `
            SELECT p.id, p.codigo, p.usuario_id, p.show_id, p.quantidade, p.total, p.criado_em,
                   s.titulo, s.artista, s.data_show, s.local_show, s.cidade
            FROM pedidos p
            JOIN shows s ON s.id = p.show_id
            WHERE p.usuario_id = ?
            ORDER BY p.id DESC`;
        const [linhas] = await pool.query(sql, [usuarioId]);
        return linhas.map(converter);
=======
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
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
    }
    return { criar, listarPorUsuario };
}
