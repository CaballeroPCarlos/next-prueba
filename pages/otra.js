import Link from "next/link";
import { useRouter } from "next/router";

export default function OtraPagina() {
  const router = useRouter();
  const { n1, n2 } = router.query;

  const suma =
    typeof n1 !== "undefined" && typeof n2 !== "undefined"
      ? Number(n1) + Number(n2)
      : "Esperando datos...";

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Otra Página</h1>
      <p>La suma de los números es: {suma}</p>
      <Link href="/">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Volver al inicio
        </button>
      </Link>
    </main>
  );
}
