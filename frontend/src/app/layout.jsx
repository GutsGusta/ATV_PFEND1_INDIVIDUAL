import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
<<<<<<< HEAD
import Cabecalho from "@/components/cabecalho";
import Rodape from "@/components/rodape";
=======
import Header from "@/components/header";
import Footer from "@/components/footer";
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
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
<<<<<<< HEAD
        <Cabecalho usuario={usuario} />
        <main className="conteudo">{children}</main>
        <Rodape />
=======
        <Header usuario={usuario} />
        <main className="conteudo">{children}</main>
        <Footer />
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
      </body>
    </html>
  );
}
