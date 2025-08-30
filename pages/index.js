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
      </Head>

      <main className="p-4">
        <div className="container">
          <div className="list-group">
            <h5 className="list-group-item active mt-3">Base de Datos</h5>
            <Link href="/libros" legacyBehavior>
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
