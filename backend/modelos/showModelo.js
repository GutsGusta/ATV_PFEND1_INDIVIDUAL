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
    }
    return { listarTodos, buscarPorId };
}
