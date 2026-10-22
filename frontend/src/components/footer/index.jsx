import "./footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape-conteudo">
        <p className="rodape-marca">Star Ticket</p>
        <p className="rodape-texto">Ingressos para os melhores shows de música pop.</p>
        <div className="rodape-links">
          <Link href="/">Início</Link>
          <Link href="/shows">Shows</Link>
          <Link href="/painel">Meus ingressos</Link>
        </div>
      </div>
    </footer>
  );
}
