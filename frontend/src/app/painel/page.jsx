import "./painel.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buscarUsuarioLogado, buscarMeusIngressos } from "@/servicos/api";
import { formatarDataCompleta, formatarMoeda } from "@/utilitarios/formatar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Meus ingressos | Star Ticket",
};

export default async function Painel() {
  const usuario = await buscarUsuarioLogado();
  if (!usuario) redirect("/login?proximo=/painel");

  let pedidos = [];
  let falhou = false;

  try {
    pedidos = await buscarMeusIngressos();
  } catch {
    falhou = true;
  }

  if (pedidos === null) redirect("/login?proximo=/painel");

  const totalIngressos = pedidos.reduce((soma, pedido) => soma + pedido.quantidade, 0);
  const totalGasto = pedidos.reduce((soma, pedido) => soma + pedido.total, 0);

  return (
    <section className="secao">
      <div className="container">
        <h1 className="secao-titulo">Olá, {usuario.nome.split(" ")[0]}</h1>
        <p className="secao-subtitulo">Aqui estão os ingressos que você comprou.</p>

        {falhou ? (
          <p className="aviso">Não foi possível carregar seus ingressos agora.</p>
        ) : (
          <>
            <div className="row g-3 resumo">
              <div className="col-12 col-md-4">
                <div className="resumo-item">
                  <span>Compras</span>
                  <strong>{pedidos.length}</strong>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="resumo-item">
                  <span>Ingressos</span>
                  <strong>{totalIngressos}</strong>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="resumo-item">
                  <span>Total gasto</span>
                  <strong>{formatarMoeda(totalGasto)}</strong>
                </div>
              </div>
            </div>

            {pedidos.length === 0 ? (
              <div className="aviso vazio">
                <p>Você ainda não comprou nenhum ingresso.</p>
                <Link href="/shows" className="botao-principal">
                  Ver shows
                </Link>
              </div>
            ) : (
              <div className="ingressos">
                {pedidos.map((pedido) => (
                  <article className="ingresso" key={pedido.id}>
                    <div className="ingresso-principal">
                      <p className="ingresso-artista">{pedido.artista}</p>
                      <h3>{pedido.titulo}</h3>
                      <ul className="ingresso-detalhes">
                        <li>
                          <i className="bi bi-calendar-event"></i>
                          {formatarDataCompleta(pedido.dataShow)}
                        </li>
                        <li>
                          <i className="bi bi-geo-alt"></i>
                          {pedido.local} · {pedido.cidade}
                        </li>
                      </ul>
                    </div>

                    <div className="ingresso-lado">
                      <span className="ingresso-codigo">{pedido.codigo}</span>
                      <p>
                        {pedido.quantidade} {pedido.quantidade === 1 ? "ingresso" : "ingressos"}
                      </p>
                      <strong>{formatarMoeda(pedido.total)}</strong>
                      <small>Comprado em {formatarDataCompleta(pedido.criadoEm)}</small>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
