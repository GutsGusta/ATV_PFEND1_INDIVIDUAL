import "./cardShow.css";
import Image from "next/image";
import Link from "next/link";
import { formatarMoeda, formatarDia, formatarMes } from "@/utilitarios/formatar";

export default function CardShow({ show }) {
  return (
    <article className="card-show">
      <div className={`card-show-capa capa-${show.tom} ${show.imagem ? "com-foto" : ""}`}>
        {show.imagem && (
          <Image
            src={show.imagem}
            alt={show.artista}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="capa-foto"
          />
        )}
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

        <div className="card-show-rodape">
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
