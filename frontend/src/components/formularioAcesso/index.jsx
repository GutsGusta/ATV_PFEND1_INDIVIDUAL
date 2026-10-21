"use client";

import "./formularioAcesso.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormularioAcesso({ tipo, destino }) {
  const roteador = useRouter();
  const cadastro = tipo === "cadastro";

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const sufixo = destino ? `?proximo=${encodeURIComponent(destino)}` : "";

  async function enviar(evento) {
    evento.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      const resposta = await fetch(`/api/auth/${cadastro ? "cadastro" : "entrar"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cadastro ? { nome, email, senha } : { email, senha }),
      });
      const resultado = await resposta.json();

      if (!resposta.ok) {
        setErro(resultado.erro || "Não foi possível continuar");
        return;
      }

      roteador.push(destino || "/painel");
      roteador.refresh();
    } catch {
      setErro("Não foi possível conectar ao servidor");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="acesso">
      <form className="acesso-caixa" onSubmit={enviar}>
        <h1>{cadastro ? "Criar conta" : "Entrar"}</h1>
        <p className="acesso-texto">
          {cadastro
            ? "Cadastre-se para comprar ingressos e acompanhar seus pedidos."
            : "Entre na sua conta para comprar ingressos e ver seus pedidos."}
        </p>

        {cadastro && (
          <label className="acesso-campo">
            Nome
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              autoComplete="name"
            />
          </label>
        )}

        <label className="acesso-campo">
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            autoComplete="email"
          />
        </label>

        <label className="acesso-campo">
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder={cadastro ? "Mínimo de 6 caracteres" : "Sua senha"}
            autoComplete={cadastro ? "new-password" : "current-password"}
          />
        </label>

        {erro && <p className="acesso-erro">{erro}</p>}

        <button type="submit" className="botao-principal acesso-botao" disabled={enviando}>
          {enviando ? "Aguarde..." : cadastro ? "Criar conta" : "Entrar"}
        </button>

        <p className="acesso-troca">
          {cadastro ? "Já tem conta? " : "Ainda não tem conta? "}
          <Link href={`${cadastro ? "/login" : "/cadastro"}${sufixo}`}>
            {cadastro ? "Entrar" : "Cadastre-se"}
          </Link>
        </p>
      </form>
    </section>
  );
}
