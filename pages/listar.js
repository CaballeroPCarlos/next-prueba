import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Listar() {
  const [personas, setPersonas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/listar")
      .then(res => res.json())
      .then(setPersonas);
  }, []);

  return (
    <div className="p-4">
      <h2>Listado de Personas</h2>
      <ul>
        {personas.map(p => (
          <li key={p.id}>{p.nombre} - {p.edad} años</li>
        ))}
      </ul>

        <div className="d-flex gap-2">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => router.push("/agregar")}
            >
                Agregar Persona
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push("/")}
            >
                Volver al menú
            </button>
        </div>
    </div>
  );
}
