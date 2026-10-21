import "./cardShow.css";
import Link from "next/link";
import { formatarMoeda, formatarDia, formatarMes } from "@/utilitarios/formatar";
import { urlImagemShow } from "@/utilitarios/imagem";

export default function CardShow({ show }) {
  const imagem = urlImagemShow(show.imagem);

  return (
    <article className="card-show">
      <div className={`card-show-capa capa-${show.tom}${imagem ? " com-imagem" : ""}`}>
        {imagem && <img className="capa-imagem" src={imagem} alt="" />}
        <div className="card-show-data">
          <strong>{formatarDia(show.data)}</strong>
          <span>{formatarMes(show.data)}</span>
        </div>
        <p className="card-show-artista">{show.artista}</p>
      </div>

      <div className="card-show-info">
        <h3>{show.titulo}</h3>

        <p className="card-show-local">
          <i className="bi bi-geo-alt"></i>
          {show.local} · {show.cidade}
        </p>

        <p className="card-show-descricao">{show.descricao}</p>

        <div className="card-show-footer">
          <div className="card-show-preco">
            <span>a partir de</span>
            <strong>{formatarMoeda(show.preco)}</strong>
          </div>

          <Link href={`/shows/${show.id}`} className="botao-principal">
            Comprar
          </Link>
        </div>
      </div>
    </article>
  );
}
