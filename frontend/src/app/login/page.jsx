import { redirect } from "next/navigation";
import FormularioAcesso from "@/components/formularioAcesso";
import { buscarUsuarioLogado } from "@/servicos/api";
import { limparDestino } from "@/utilitarios/destino";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Entrar | Star Ticket",
};

export default async function Login({ searchParams }) {
  const { proximo } = await searchParams;
  const destino = limparDestino(proximo);
  const usuario = await buscarUsuarioLogado();

  if (usuario) redirect(destino || "/painel");

  return <FormularioAcesso tipo="login" destino={destino} />;
}
