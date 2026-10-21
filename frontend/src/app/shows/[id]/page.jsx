import "./show.css";
import Link from "next/link";
import FormularioCompra from "@/components/formularioCompra";
import { buscarShow, buscarUsuarioLogado } from "@/servicos/api";
import { formatarDataCompleta, formatarMoeda } from "@/utilitarios/formatar";
import { urlImagemShow } from "@/utilitarios/imagem";

export const dynamic = "force-dynamic";

export default async function DetalheShow({ params }) {
  const { id } = await params;
  let show = null;
  let falhou = false;
  const usuario = await buscarUsuarioLogado();

  try {
    show = await buscarShow(id);
  } catch {
    falhou = true;
  }

  if (falhou || !show) {
    return (
      <section className="secao">
        <div className="container">
          <p className="aviso">
            {falhou ? "Não foi possível carregar o show agora." : "Show não encontrado."}
          </p>
          <div className="show-voltar">
            <Link href="/shows" className="botao-contorno">
              Voltar para os shows
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const imagem = urlImagemShow(show.imagem);

  return (
    <section className="secao">
      <div className="container">
        <Link href="/shows" className="show-link-voltar">
          <i className="bi bi-arrow-left"></i> Voltar
        </Link>

        <div className="row g-5">
          <div className="col-12 col-lg-7">
            <div className={`show-capa capa-${show.tom}${imagem ? " com-imagem" : ""}`}>
              {imagem && <img className="capa-imagem" src={imagem} alt={`Imagem do show ${show.titulo}`} />}
              <p>{show.artista}</p>
            </div>

            <h1 className="show-titulo">{show.titulo}</h1>

            <ul className="show-detalhes">
              <li>
                <i className="bi bi-calendar-event"></i>
                {formatarDataCompleta(show.data)}
              </li>
              <li>
                <i className="bi bi-geo-alt"></i>
                {show.local} · {show.cidade}
              </li>
              <li>
                <i className="bi bi-ticket-perforated"></i>
                Ingressos a partir de {formatarMoeda(show.preco)}
              </li>
            </ul>

            <h2 className="show-subtitulo">Sobre o show</h2>
            <p className="show-descricao">{show.descricao}</p>
          </div>

          <div className="col-12 col-lg-5">
            <FormularioCompra show={show} usuario={usuario} />
          </div>
        </div>
      </div>
    </section>
  );
}
