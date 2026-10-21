const nomeDoCookie = 'token';
const duracaoEmSegundos = 60 * 60 * 24 * 7;

export function lerToken(req) {
    const texto = req.headers.cookie || '';
    const parte = texto.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${nomeDoCookie}=`));
    return parte ? decodeURIComponent(parte.slice(nomeDoCookie.length + 1)) : null;
}

export function guardarToken(res, token) {
    const seguro = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `${nomeDoCookie}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${duracaoEmSegundos}${seguro}`);
}

export function apagarToken(res) {
    res.setHeader('Set-Cookie', `${nomeDoCookie}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`);
}
