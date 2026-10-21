export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

export function formatarDataCompleta(texto) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(texto));
}

export function formatarDia(texto) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(texto));
}

export function formatarMes(texto) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    timeZone: "America/Sao_Paulo",
  })
    .format(new Date(texto))
    .replace(".", "")
    .toUpperCase();
}
