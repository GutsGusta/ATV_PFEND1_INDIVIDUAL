import "./show.css";
<<<<<<< HEAD
import Image from "next/image";
=======
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
import Link from "next/link";
import FormularioCompra from "@/components/formularioCompra";
import { buscarShow, buscarUsuarioLogado } from "@/servicos/api";
import { formatarDataCompleta, formatarMoeda } from "@/utilitarios/formatar";
<<<<<<< HEAD
=======
import { urlImagemShow } from "@/utilitarios/imagem";
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3

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

<<<<<<< HEAD
=======
  const imagem = urlImagemShow(show.imagem);

>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
  return (
    <section className="secao">
      <div className="container">
        <Link href="/shows" className="show-link-voltar">
          <i className="bi bi-arrow-left"></i> Voltar
        </Link>

        <div className="row g-5">
          <div className="col-12 col-lg-7">
<<<<<<< HEAD
            <div className={`show-capa capa-${show.tom} ${show.imagem ? "com-foto" : ""}`}>
              {show.imagem && (
                <Image
                  src={show.imagem}
                  alt={show.artista}
                  fill
                  sizes="(max-width: 992px) 100vw, 700px"
                  className="capa-foto"
                  priority
                />
              )}
=======
            <div className={`show-capa capa-${show.tom}${imagem ? " com-imagem" : ""}`}>
              {imagem && <img className="capa-imagem" src={imagem} alt={`Imagem do show ${show.titulo}`} />}
>>>>>>> b637d9e47172bd5fa123f9d95ea8d77a307081d3
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
