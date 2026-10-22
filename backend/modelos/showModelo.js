<<<<<<< HEAD
function converter(linha) {
    return {
        id: linha.id,
        titulo: linha.titulo,
        artista: linha.artista,
        data: linha.data_show,
        local: linha.local_show,
        cidade: linha.cidade,
        descricao: linha.descricao,
        preco: Number(linha.preco),
        tom: linha.tom,
        imagem: linha.imagem
    };
}

export function criarShowModelo({ pool }) {
    async function listarTodos() {
        const [linhas] = await pool.query('SELECT * FROM shows ORDER BY data_show');
        return linhas.map(converter);
    }
    async function buscarPorId(id) {
        const [linhas] = await pool.query('SELECT * FROM shows WHERE id = ?', [id]);
        if (linhas.length === 0) return null;
        return converter(linhas[0]);
=======
import { banco } from '../dados/conexao.js';

const colunas = `
    id,
    titulo,
    artista,
    data_show AS data,
    \`local\`,
    cidade,
    descricao,
    preco,
    tom,
    imagem`;

export function criarShowModelo() {
    async function listarTodos() {
        const [linhas] = await banco.query(`SELECT ${colunas} FROM shows ORDER BY data_show`);
        return linhas;
    }
    async function buscarPorId(id) {
        const [linhas] = await banco.query(`SELECT ${colunas} FROM shows WHERE id = ?`, [id]);
        return linhas[0] || null;
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
    }
    return { listarTodos, buscarPorId };
}
