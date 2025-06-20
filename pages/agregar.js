import { useState } from "react";
import { useRouter } from "next/router";

export default function Agregar() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const router = useRouter();

  const guardar = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/agregar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, edad }),
    });

    if (res.ok) {
      alert("Persona agregada");
      router.push("/listar");
    } else {
      alert("Error al agregar");
    }
  };

  return (
    <div className="p-4">
      <h2>Agregar Persona</h2>
      <form onSubmit={guardar} className="mb-3">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
          className="form-control mb-2"
        />
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          placeholder="Edad"
          required
          className="form-control mb-3"
        />
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.push("/listar")}
          >
            Ver lista
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => router.push("/")}
          >
            Volver al menú
          </button>
        </div>
      </form>
    </div>
  );
}
