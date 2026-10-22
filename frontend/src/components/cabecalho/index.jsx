"use client";

import "./cabecalho.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Cabecalho({ usuario }) {
  const caminho = usePathname();
  const roteador = useRouter();

  async function sair() {
    await fetch("/api/auth/sair", { method: "POST" });
    roteador.push("/");
    roteador.refresh();
  }

  return (
    <header className="cabecalho">
      <div className="container cabecalho-conteudo">
        <Link href="/" className="logo">
          <span className="logo-caixa">
            <i className="bi bi-star-fill"></i>
          </span>
          <span className="logo-texto">Star Ticket</span>
        </Link>

        <nav className="menu">
          <Link href="/" className={`menu-link ${caminho === "/" ? "ativo" : ""}`}>
            Início
          </Link>
          <Link href="/shows" className={`menu-link ${caminho.startsWith("/shows") ? "ativo" : ""}`}>
            Shows
          </Link>
          {usuario && (
            <Link href="/painel" className={`menu-link ${caminho === "/painel" ? "ativo" : ""}`}>
              Meus ingressos
            </Link>
          )}
        </nav>

        <div className="acoes">
          {usuario ? (
            <>
              <span className="acoes-nome">Olá, {usuario.nome.split(" ")[0]}</span>
              <button type="button" className="botao-contorno botao-pequeno" onClick={sair}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="botao-contorno botao-pequeno">
                Entrar
              </Link>
              <Link href="/cadastro" className="botao-principal botao-pequeno">
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
