import { cookies } from "next/headers";

const urlApi = process.env.API_URL || "http://localhost:3001";

<<<<<<< HEAD
async function cabecalhoComToken() {
=======
async function headerComToken() {
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
  const guarda = await cookies();
  const token = guarda.get("token");
  return token ? { Cookie: `token=${token.value}` } : {};
}

export async function buscarShows() {
  const resposta = await fetch(`${urlApi}/api/shows`, { cache: "no-store" });
  if (!resposta.ok) throw new Error("Não foi possível carregar os shows");
  const { dados } = await resposta.json();
  return dados;
}

export async function buscarShow(id) {
  const resposta = await fetch(`${urlApi}/api/shows/${id}`, { cache: "no-store" });
  if (resposta.status === 404 || resposta.status === 400) return null;
  if (!resposta.ok) throw new Error("Não foi possível carregar o show");
  const { dados } = await resposta.json();
  return dados;
}

export async function buscarUsuarioLogado() {
  try {
<<<<<<< HEAD
    const cabecalho = await cabecalhoComToken();
    if (!cabecalho.Cookie) return null;
    const resposta = await fetch(`${urlApi}/api/auth/eu`, { cache: "no-store", headers: cabecalho });
=======
    const header = await headerComToken();
    if (!header.Cookie) return null;
    const resposta = await fetch(`${urlApi}/api/auth/eu`, { cache: "no-store", headers: header });
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
    if (!resposta.ok) return null;
    const { dados } = await resposta.json();
    return dados;
  } catch {
    return null;
  }
}

export async function buscarMeusIngressos() {
<<<<<<< HEAD
  const cabecalho = await cabecalhoComToken();
  const resposta = await fetch(`${urlApi}/api/ingressos/meus`, { cache: "no-store", headers: cabecalho });
=======
  const header = await headerComToken();
  const resposta = await fetch(`${urlApi}/api/ingressos/meus`, { cache: "no-store", headers: header });
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
  if (resposta.status === 401) return null;
  if (!resposta.ok) throw new Error("Não foi possível carregar os ingressos");
  const { dados } = await resposta.json();
  return dados;
}
