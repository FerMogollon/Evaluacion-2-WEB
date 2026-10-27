import { useEffect, useState } from "react";

const PISTA = {
  mas_alta: "Era más alta",
  mas_baja: "Era más baja",
  estabilizado: "Estabilizado",
};

export default function Historial({ historial }) {
  const [abierto, setAbierto] = useState(false);

  // Cerrar con Escape
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto]);

  return (
    <>
      <button
        className="hamburguesa"
        onClick={() => setAbierto(true)}
        aria-label="Abrir registro de intentos"
        aria-expanded={abierto}
        aria-controls="panel-historial"
      >
        <span className="hamburguesa-barras" aria-hidden="true" />
        {historial.length > 0 && <span className="hamburguesa-contador">{historial.length}</span>}
      </button>

      <div
        className={`velo ${abierto ? "abierto" : ""}`}
        onClick={() => setAbierto(false)}
        aria-hidden="true"
      />

      <aside
        id="panel-historial"
        className={`panel ${abierto ? "abierto" : ""}`}
        aria-label="Registro de intentos"
        aria-hidden={!abierto}
        inert={!abierto ? "" : undefined}
      >
        <div className="panel-cabecera">
          <h2>Registro de intentos</h2>
          <button className="cerrar" onClick={() => setAbierto(false)} aria-label="Cerrar registro">
            ✕
          </button>
        </div>

        {historial.length === 0 ? (
          <p className="vacio">Aún no has probado ninguna temperatura.</p>
        ) : (
          <ol className="lista" reversed>
            {[...historial].reverse().map((intento, i) => (
              <li key={historial.length - i} className={`fila ${intento.resultado}`}>
                <span className="fila-temp">{intento.temperatura}°</span>
                <span className="fila-pista">{PISTA[intento.resultado]}</span>
              </li>
            ))}
          </ol>
        )}
      </aside>
    </>
  );
}
