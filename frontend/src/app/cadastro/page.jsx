import { redirect } from "next/navigation";
import FormularioAcesso from "@/components/formularioAcesso";
import { buscarUsuarioLogado } from "@/servicos/api";
import { limparDestino } from "@/utilitarios/destino";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Criar conta | Star Ticket",
};

export default async function Cadastro({ searchParams }) {
  const { proximo } = await searchParams;
  const destino = limparDestino(proximo);
  const usuario = await buscarUsuarioLogado();

  if (usuario) redirect(destino || "/painel");

  return <FormularioAcesso tipo="cadastro" destino={destino} />;
}
