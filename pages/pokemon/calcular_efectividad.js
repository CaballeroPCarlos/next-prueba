import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/calcularEfectividad.module.css";
import Link from "next/link";
import { tipos, efectividades } from "@/components/datosTipos";
import TablaEfectividad from "@/components/TablaEfectividad";

export default function CalcularEfectividad() {
  const [selecciones, setSelecciones] = useState({});

  useEffect(() => {
    const almacenadas = {};
    for (let i = 1; i <= 6; i++) {
      almacenadas[`tipo1_pokemon${i}`] = localStorage.getItem(`tipo1_pokemon${i}`) || "";
      almacenadas[`tipo2_pokemon${i}`] = localStorage.getItem(`tipo2_pokemon${i}`) || "";
    }
    setSelecciones(almacenadas);
  }, []);

  const actualizarSeleccion = (id, valor) => {
    const nuevas = { ...selecciones, [id]: valor };
    setSelecciones(nuevas);
    localStorage.setItem(id, valor);
  };

  const resetear = () => {
    const nuevas = {};
    for (let i = 1; i <= 6; i++) {
      nuevas[`tipo1_pokemon${i}`] = "";
      nuevas[`tipo2_pokemon${i}`] = "";
      localStorage.removeItem(`tipo1_pokemon${i}`);
      localStorage.removeItem(`tipo2_pokemon${i}`);
    }
    setSelecciones(nuevas);
  };

  const obtenerTiposEquipo = () => {
    const tiposEquipo = [];
    for (let i = 1; i <= 6; i++) {
      const t1 = selecciones[`tipo1_pokemon${i}`];
      const t2 = selecciones[`tipo2_pokemon${i}`];
      if (t1) tiposEquipo.push(t1);
      if (t2) tiposEquipo.push(t2);
    }
    return tiposEquipo;
  };

  return (
    <>
      <Head>
        <title>Efectividad Pokémon</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Verificar Efectividad entre Tipos</h2>
          <div className="mt-4">
            <Link href="/">
              <button className="btn btn-primary">Volver al Inicio</button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            {[...Array(6)].map((_, i) => {
              const id1 = `tipo1_pokemon${i + 1}`;
              const id2 = `tipo2_pokemon${i + 1}`;
              return (
                <div className="row mb-3" key={i}>
                  <div className="col-6">
                    <select
                      className="form-select"
                      value={selecciones[id1] || ""}
                      onChange={(e) => actualizarSeleccion(id1, e.target.value)}
                    >
                      <option value="">Tipo 1 - Pokémon {i + 1}</option>
                      {tipos.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <select
                      className="form-select"
                      value={selecciones[id2] || ""}
                      onChange={(e) => actualizarSeleccion(id2, e.target.value)}
                    >
                      <option value="">Tipo 2 - Pokémon {i + 1}</option>
                      {tipos.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
            <button className="btn btn-sm btn-outline-secondary" onClick={resetear}>
              Reiniciar selección
            </button>
          </div>

          <div className={`col-md-7 ${styles.tablaEfectividad}`}>
            <TablaEfectividad
              tiposEquipo={obtenerTiposEquipo()}
              tipos={tipos}
              efectividades={efectividades}
            />
          </div>
        </div>
      </main>
    </>
  );
}
