export function limparDestino(valor) {
  if (typeof valor !== "string") return "";
  if (!valor.startsWith("/") || valor.startsWith("//") || valor.includes("\\")) return "";
  return valor;
}
