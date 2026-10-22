import "./inicio.css";
import Link from "next/link";
import CardShow from "@/components/cardShow";
import { buscarShows, buscarUsuarioLogado } from "@/servicos/api";

export const dynamic = "force-dynamic";

const passos = [
  {
    icone: "bi-person-plus",
    titulo: "Crie sua conta",
    texto: "Faça seu cadastro com nome, e-mail e senha. Leva menos de um minuto.",
  },
  {
    icone: "bi-music-note-list",
    titulo: "Escolha o show",
    texto: "Veja data, local e descrição de cada evento e decida o que combina com você.",
  },
  {
    icone: "bi-ticket-perforated",
    titulo: "Receba seus ingressos",
    texto: "Depois da compra, seus ingressos ficam guardados na sua conta.",
  },
];

const vantagens = [
  {
    icone: "bi-lightning",
    titulo: "Compra rápida",
    texto: "Escolha a quantidade e finalize em poucos cliques.",
  },
  {
    icone: "bi-person-badge",
    titulo: "Tudo na sua conta",
    texto: "Acompanhe todos os ingressos que você já comprou em um só lugar.",
  },
  {
    icone: "bi-stars",
    titulo: "Foco no pop",
    texto: "Só shows de música pop, com informações claras de cada evento.",
  },
];

const perguntas = [
  {
    pergunta: "Preciso de uma conta para comprar?",
    resposta: "Sim. Só usuários cadastrados podem comprar. O cadastro é rápido e gratuito.",
  },
  {
    pergunta: "Onde encontro meus ingressos?",
    resposta: "Na página Meus ingressos, que aparece no menu depois que você entra na sua conta.",
  },
  {
    pergunta: "Quantos ingressos posso comprar de uma vez?",
    resposta: "Até 8 ingressos em cada compra.",
  },
  {
    pergunta: "Posso comprar ingressos para mais de um show?",
    resposta: "Pode. Cada compra aparece separada na sua lista de ingressos.",
  },
];

export default async function Inicio() {
  let shows = [];
  let falhou = false;
  const usuario = await buscarUsuarioLogado();

  try {
    shows = await buscarShows();
  } catch {
    falhou = true;
  }

  return (
    <>
      <section className="destaque">
        <div className="container">
          <span className="etiqueta">Música pop ao vivo</span>
          <h1>Os melhores shows de pop em um só lugar</h1>
          <p>Escolha seu show favorito, garanta seus ingressos e acompanhe tudo pela sua conta.</p>
          <div className="destaque-botoes">
            <Link href="/shows" className="botao-principal">
              Ver shows
            </Link>
            {usuario ? (
              <Link href="/painel" className="botao-contorno">
                Meus ingressos
              </Link>
            ) : (
              <Link href="/cadastro" className="botao-contorno">
                Criar conta
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <h2 className="secao-titulo">Como funciona</h2>
          <p className="secao-subtitulo">Em três passos você garante seu lugar.</p>

          <div className="row g-4">
            {passos.map((passo, indice) => (
              <div className="col-12 col-md-4" key={passo.titulo}>
                <div className="passo">
                  <span className="passo-numero">{indice + 1}</span>
                  <i className={`bi ${passo.icone}`}></i>
                  <h3>{passo.titulo}</h3>
                  <p>{passo.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <h2 className="secao-titulo">Próximos shows</h2>
          <p className="secao-subtitulo">Os eventos que estão chegando.</p>

          {falhou ? (
            <p className="aviso">Não foi possível carregar os shows agora. Verifique se o servidor está rodando.</p>
          ) : (
            <>
              <div className="row g-4">
                {shows.slice(0, 3).map((show) => (
                  <div className="col-12 col-md-6 col-lg-4" key={show.id}>
                    <CardShow show={show} />
                  </div>
                ))}
              </div>
              <div className="ver-todos">
                <Link href="/shows" className="botao-contorno">
                  Ver todos os shows
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <h2 className="secao-titulo">Por que usar a Star Ticket</h2>
          <p className="secao-subtitulo">Simples de usar, do começo ao fim.</p>

          <div className="row g-4">
            {vantagens.map((vantagem) => (
              <div className="col-12 col-md-4" key={vantagem.titulo}>
                <div className="vantagem">
                  <i className={`bi ${vantagem.icone}`}></i>
                  <div>
                    <h3>{vantagem.titulo}</h3>
                    <p>{vantagem.texto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container perguntas-area">
          <h2 className="secao-titulo">Perguntas frequentes</h2>
          <p className="secao-subtitulo">Tire suas dúvidas antes de comprar.</p>

          <div className="perguntas">
            {perguntas.map((item) => (
              <details key={item.pergunta}>
                <summary>{item.pergunta}</summary>
                <p>{item.resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="chamada">
            <h2>Pronto para o próximo show?</h2>
            <p>
              {usuario
                ? "Veja os shows disponíveis e garanta mais ingressos."
                : "Crie sua conta e garanta seus ingressos em poucos minutos."}
            </p>
            <Link href={usuario ? "/shows" : "/cadastro"} className="botao-principal">
              {usuario ? "Ver shows" : "Criar minha conta"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
