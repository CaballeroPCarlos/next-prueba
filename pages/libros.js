import { useEffect, useState } from "react";
import styles from "@/styles/libros.module.css";

export default function LibrosPage() {
  const [libros, setLibros] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [orden, setOrden] = useState("id-desc"); // por defecto: más recientes
  const [mostrarModal, setMostrarModal] = useState(false);

  // Estados formulario
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: "", autor: "", anio: "" });
  const [editando, setEditando] = useState(null);

  const librosPorPagina = 10;

  // Cargar libros
  const cargarLibros = async () => {
    const res = await fetch("/api/libros/listar");
    const data = await res.json();
    setLibros(data);
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  // Función de orden
  const ordenarLibros = (lista) => {
    switch (orden) {
      case "titulo-asc": return [...lista].sort((a, b) => a.titulo.localeCompare(b.titulo));
      case "titulo-desc": return [...lista].sort((a, b) => b.titulo.localeCompare(a.titulo));
      case "autor-asc": return [...lista].sort((a, b) => a.autor.localeCompare(b.autor));
      case "autor-desc": return [...lista].sort((a, b) => b.autor.localeCompare(a.autor));
      case "anio-asc": return [...lista].sort((a, b) => a.anio - b.anio);
      case "anio-desc": return [...lista].sort((a, b) => b.anio - a.anio);
      case "id-asc": return [...lista].sort((a, b) => a.id - b.id);
      case "id-desc": return [...lista].sort((a, b) => b.id - a.id);
      default: return lista;
    }
  };

  const librosOrdenados = ordenarLibros(libros);

  // Paginación
  const totalPaginas = Math.ceil(librosOrdenados.length / librosPorPagina);
  const inicio = (pagina - 1) * librosPorPagina;
  const librosPagina = librosOrdenados.slice(inicio, inicio + librosPorPagina);

  // Crear libro
  const agregarLibro = async () => {
    if (!nuevoLibro.titulo.trim() || !nuevoLibro.autor.trim() || !nuevoLibro.anio) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    await fetch("/api/libros/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoLibro),
    });

    setNuevoLibro({ titulo: "", autor: "", anio: "" });
    setMostrarModal(false);
    cargarLibros();
  };

  // Actualizar libro
  const actualizarLibro = async (libro) => {
    await fetch("/api/libros/actualizar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(libro),
    });
    setEditando(null);
    cargarLibros();
  };

  // Eliminar libro
  const eliminarLibro = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este libro?")) return;
    await fetch("/api/libros/eliminar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    cargarLibros();
  };

  // Toggle de orden al clickear encabezados
  const toggleOrden = (campo) => {
    setOrden((prev) => {
      if (prev.startsWith(campo)) {
        return prev.endsWith("asc") ? `${campo}-desc` : `${campo}-asc`;
      }
      // defaults: ID -> desc, Año -> desc, Título/Autor -> asc
      if (campo === "id" || campo === "anio") return `${campo}-desc`;
      return `${campo}-asc`;
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Libros</h1>

      {/* Botón principal arriba */}
      <button className={styles.addButtonMain} onClick={() => setMostrarModal(true)}>
        Agregar Libro
      </button>

      {/* Tabla */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => toggleOrden("id")} className={styles.clickable}>ID</th>
            <th onClick={() => toggleOrden("titulo")} className={styles.clickable}>Título</th>
            <th onClick={() => toggleOrden("autor")} className={styles.clickable}>Autor</th>
            <th onClick={() => toggleOrden("anio")} className={styles.clickable}>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {librosPagina.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>
                {editando === libro.id ? (
                  <input
                    className={styles.inputInline}
                    value={libro.titulo}
                    onChange={(e) =>
                      setLibros((prev) =>
                        prev.map((l) => l.id === libro.id ? { ...l, titulo: e.target.value } : l)
                      )
                    }
                  />
                ) : libro.titulo}
              </td>
              <td>
                {editando === libro.id ? (
                  <input
                    className={styles.inputInline}
                    value={libro.autor}
                    onChange={(e) =>
                      setLibros((prev) =>
                        prev.map((l) => l.id === libro.id ? { ...l, autor: e.target.value } : l)
                      )
                    }
                  />
                ) : libro.autor}
              </td>
              <td>
                {editando === libro.id ? (
                  <input
                    type="number"
                    className={styles.inputInline}
                    value={libro.anio}
                    onChange={(e) =>
                      setLibros((prev) =>
                        prev.map((l) => l.id === libro.id ? { ...l, anio: e.target.value } : l)
                      )
                    }
                  />
                ) : libro.anio}
              </td>
              <td className={styles.actions}>
                {editando === libro.id ? (
                  <>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => actualizarLibro(libro)}>💾 Guardar</button>
                    <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setEditando(null)}>❌ Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setEditando(libro.id)}>✏️ Editar</button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => eliminarLibro(libro.id)}>🗑️ Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPagina(num)}
            disabled={num === pagina}
            className={styles.pageButton}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Modal para agregar libro */}
      {mostrarModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Detalles del Libro</h2>
            <form
              onSubmit={(e) => {
              e.preventDefault();
              agregarLibro();
              }}
            >
              <input
                className={styles.input}
                placeholder="Título"
                value={nuevoLibro.titulo}
                onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
                required
              />
              <input
                className={styles.input}
                placeholder="Autor"
                value={nuevoLibro.autor}
                onChange={(e) => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })}
                required
              />
              <input
                type="number"
                className={styles.input}
                placeholder="Año"
                value={nuevoLibro.anio}
                onChange={(e) => setNuevoLibro({ ...nuevoLibro, anio: e.target.value })}
                required
                min="1"
              />
              <div className={styles.modalActions}>
                <button type="submit" className={styles.btnPrimary}>Agregar</button>
                <button type="button" className={styles.btnGhost} onClick={() => setMostrarModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
