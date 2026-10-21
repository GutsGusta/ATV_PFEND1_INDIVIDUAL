export function urlImagemShow(imagem) {
  if (typeof imagem !== "string" || imagem.trim() === "") return null;
  const valor = imagem.trim();
  if (/^https?:\/\//i.test(valor) || valor.startsWith("/")) return valor;
  return `/imagens/shows/${encodeURIComponent(valor)}`;
}
