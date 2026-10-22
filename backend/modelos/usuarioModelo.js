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
        return linhas[0] || null;
    }
    return { criar, buscarPorEmail, buscarPorId };
}
