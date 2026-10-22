"use client";

import "./formularioCompra.css";
import Link from "next/link";
import { useState } from "react";
import { formatarMoeda } from "@/utilitarios/formatar";

export default function FormularioCompra({ show, usuario }) {
  const [quantidade, setQuantidade] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [pedido, setPedido] = useState(null);

  const total = show.preco * quantidade;
  const destino = encodeURIComponent(`/shows/${show.id}`);

  async function comprar(evento) {
    evento.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      const resposta = await fetch("/api/ingressos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showId: show.id, quantidade }),
      });
      const resultado = await resposta.json();

      if (!resposta.ok) {
        setErro(resultado.erro || "Não foi possível finalizar a compra");
        return;
      }

      setPedido(resultado.dados);
    } catch {
      setErro("Não foi possível conectar ao servidor");
    } finally {
      setEnviando(false);
    }
  }

  if (!usuario) {
    return (
      <div className="compra">
        <h3>Comprar ingressos</h3>
        <p className="compra-aviso">Para comprar, entre na sua conta ou crie um cadastro.</p>
        <div className="compra-opcoes">
          <Link href={`/login?proximo=${destino}`} className="botao-principal">
            Entrar
          </Link>
          <Link href={`/cadastro?proximo=${destino}`} className="botao-contorno">
            Criar conta
          </Link>
        </div>
      </div>
    );
  }

  if (pedido) {
    return (
      <div className="compra-sucesso">
        <i className="bi bi-check-circle"></i>
        <h3>Compra confirmada!</h3>
        <p>
          {pedido.quantidade} {pedido.quantidade === 1 ? "ingresso" : "ingressos"} para{" "}
          <strong>{pedido.titulo}</strong>
        </p>
        <p className="compra-codigo">{pedido.codigo}</p>
        <p className="compra-aviso">Total: {formatarMoeda(pedido.total)}</p>
        <div className="compra-opcoes">
          <Link href="/painel" className="botao-principal">
            Ver meus ingressos
          </Link>
          <Link href="/shows" className="botao-contorno">
            Ver outros shows
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="compra" onSubmit={comprar}>
      <h3>Comprar ingressos</h3>
      <p className="compra-aviso">Comprando como {usuario.nome}.</p>

      <label className="compra-campo">
        Quantidade
        <select value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((numero) => (
            <option key={numero} value={numero}>
              {numero}
            </option>
          ))}
        </select>
      </label>

      <div className="compra-total">
        <span>Total</span>
        <strong>{formatarMoeda(total)}</strong>
      </div>

      {erro && <p className="compra-erro">{erro}</p>}

      <button type="submit" className="botao-principal compra-botao" disabled={enviando}>
        {enviando ? "Finalizando..." : "Finalizar compra"}
      </button>
    </form>
  );
}
