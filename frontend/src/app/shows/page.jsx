import CardShow from "@/components/cardShow";
import { buscarShows } from "@/servicos/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shows | Star Ticket",
};

export default async function Shows() {
  let shows = [];
  let falhou = false;

  try {
    shows = await buscarShows();
  } catch {
    falhou = true;
  }

  return (
    <section className="secao">
      <div className="container">
        <h1 className="secao-titulo">Todos os shows</h1>
        <p className="secao-subtitulo">Escolha o show e compre seus ingressos.</p>

        {falhou ? (
          <p className="aviso">Não foi possível carregar os shows agora. Verifique se o servidor está rodando.</p>
        ) : (
          <div className="row g-4">
            {shows.map((show) => (
              <div className="col-12 col-md-6 col-lg-4" key={show.id}>
                <CardShow show={show} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
