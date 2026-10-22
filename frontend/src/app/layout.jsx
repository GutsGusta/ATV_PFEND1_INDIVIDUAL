import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Cabecalho from "@/components/cabecalho";
import Rodape from "@/components/rodape";
import { buscarUsuarioLogado } from "@/servicos/api";

const fonteTitulo = Plus_Jakarta_Sans({
  variable: "--fonte-titulo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const fonteTexto = Inter({
  variable: "--fonte-texto",
  subsets: ["latin"],
});

export const metadata = {
  title: "Star Ticket | Ingressos para shows de pop",
  description: "Compre ingressos para os melhores shows de música pop na Star Ticket.",
};

export default async function LayoutRaiz({ children }) {
  const usuario = await buscarUsuarioLogado();

  return (
    <html lang="pt-BR" className={`${fonteTitulo.variable} ${fonteTexto.variable}`}>
      <body>
        <Cabecalho usuario={usuario} />
        <main className="conteudo">{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
