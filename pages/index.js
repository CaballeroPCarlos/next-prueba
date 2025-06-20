import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const manejarEnvio = (e) => {
    e.preventDefault();
    const n1 = e.target.n1.value;
    const n2 = e.target.n2.value;

    if (!isNaN(n1) && !isNaN(n2)) {
      router.push(`/otra?n1=${n1}&n2=${n2}`);
    } else {
      alert("Por favor, ingrese solo números.");
    }
  };

  return (
    <>
      <Head>
        <title>Menú Principal</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="p-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Calculadoras de Estadísticas</h2>
            <span className="text-muted">Proyecto Personal</span>
          </div>

          <div className="list-group">
            <h5 className="list-group-item active mt-3">Pokémon</h5>
            <Link href="/pokemon/calcular_efectividad" legacyBehavior>
              <a className="list-group-item list-group-item-action">
                Verificar Efectividad entre Tipos
              </a>
            </Link>

            <h5 className="list-group-item active mt-4">Extras</h5>
            <div className="list-group-item">
              <form onSubmit={manejarEnvio}>
                <label htmlFor="n1">Ingresa dos números:</label>
                <div className="d-flex gap-2 my-2">
                  <input
                    id="n1"
                    name="n1"
                    type="number"
                    className="form-control"
                    placeholder="Número 1"
                    required
                  />
                  <input
                    id="n2"
                    name="n2"
                    type="number"
                    className="form-control"
                    placeholder="Número 2"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Calcular Suma
                </button>
              </form>
            </div>

            <h5 className="list-group-item active mt-3">Base de Datos</h5>
            <Link href="/listar" legacyBehavior>
              <a className="list-group-item list-group-item-action">
                Listar Tabla
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
