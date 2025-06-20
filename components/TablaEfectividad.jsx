import styles from "@/styles/calcularEfectividad.module.css";

export default function TablaEfectividad({ tiposEquipo, tipos, efectividades }) {
  if (tiposEquipo.length === 0) return null;

  const eficaces = new Set();
  tiposEquipo.forEach(tipo => {
    (efectividades[tipo] || []).forEach(t => eficaces.add(t));
  });

  const cols = 6;
  const filas = [];
  for (let i = 0; i < tipos.length; i += cols) {
    const celdas = [];
    for (let j = 0; j < cols; j++) {
      const idx = i + j;
      if (idx >= tipos.length) {
        celdas.push(<td key={j}></td>);
        continue;
      }
      const t = tipos[idx];
      const simbolo = eficaces.has(t)
        ? <span className={`${styles.simbolo} ${styles.eficaz}`}>▲▲▲</span>
        : <span className={`${styles.simbolo} ${styles.noEficaz}`}>▼</span>;
      celdas.push(
        <td key={j} className={styles.celda}>
          {t}<br />
          {simbolo}
        </td>
      );
    }
    filas.push(<tr key={i}>{celdas}</tr>);
  }

  return (
    <table className={`table table-bordered ${styles.tabla}`}>
      <tbody>{filas}</tbody>
    </table>
  );
}
