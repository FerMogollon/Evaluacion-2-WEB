import { useState } from "react";
import { ajustarTemperatura, reiniciarSistema } from "./api.js";
import Historial from "./components/Historial.jsx";

const TEMP_MIN = 1;
const TEMP_MAX = 100; // igual que config.js del backend

export default function App() {
  const [valor, setValor] = useState("");
  const [historial, setHistorial] = useState([]); // [{ temperatura, resultado }]
  const [advertencia, setAdvertencia] = useState(""); // mensaje del servidor (o error)
  const [resultado, setResultado] = useState(null); // "mas_alta" | "mas_baja" | "estabilizado" | "error" | null
  const [estabilizado, setEstabilizado] = useState(false); // true = el usuario ganó
  const [cargando, setCargando] = useState(false);

  const ultimo = historial[historial.length - 1];

  const enviar = async (e) => {
    e.preventDefault();
    const intento = Number(valor);

    if (valor === "" || !Number.isInteger(intento) || intento < TEMP_MIN || intento > TEMP_MAX) {
      setResultado("error");
      setAdvertencia(`Ingresa un número entero entre ${TEMP_MIN} y ${TEMP_MAX}`);
      return;
    }

    setCargando(true);
    try {
      const data = await ajustarTemperatura(intento);
      setHistorial((h) => [...h, { temperatura: intento, resultado: data.resultado }]);
      setAdvertencia(data.mensaje);
      setResultado(data.resultado);
      setEstabilizado(data.resultado === "estabilizado");
      setValor("");
    } catch (err) {
      setResultado("error");
      setAdvertencia(err.message);
    } finally {
      setCargando(false);
    }
  };

  const reiniciar = async () => {
    setCargando(true);
    try {
      await reiniciarSistema();
      setHistorial([]);
      setAdvertencia("");
      setResultado(null);
      setEstabilizado(false);
      setValor("");
    } catch (err) {
      setResultado("error");
      setAdvertencia(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="app">
      <header>
        <h1>Estabiliza el Reactor</h1>
        <p className="sub">
          Adivina la temperatura de estabilización, entre {TEMP_MIN} y {TEMP_MAX}.
        </p>
      </header>

      {/* Lectura del reactor: la pieza protagonista */}
      <section className={`lectura ${resultado ?? ""}`} aria-label="Última lectura del reactor">
        <p className="lectura-valor">{ultimo ? `${ultimo.temperatura}°` : "--"}</p>
        <p className="lectura-mensaje" role="status" aria-live="polite">
          {advertencia || "Esperando tu primer ajuste"}
        </p>
      </section>

      {estabilizado ? (
        <section className="victoria">
          <p>Lo lograste en {historial.length} {historial.length === 1 ? "intento" : "intentos"}.</p>
          <button className="btn rosa" onClick={reiniciar} disabled={cargando}>
            Reiniciar sistema
          </button>
        </section>
      ) : (
        <form className="formulario" onSubmit={enviar} noValidate>
          <label htmlFor="temperatura" className="etiqueta">Temperatura de ajuste</label>
          <input
            id="temperatura"
            type="number"
            inputMode="numeric"
            min={TEMP_MIN}
            max={TEMP_MAX}
            step="1"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder={`${TEMP_MIN} – ${TEMP_MAX}`}
            autoFocus
          />
          <button className="btn azul" type="submit" disabled={cargando}>
            {cargando ? "Ajustando…" : "Ajustar temperatura"}
          </button>
        </form>
      )}

      <Historial historial={historial} />

      {!estabilizado && historial.length > 0 && (
        <button className="btn-texto" onClick={reiniciar} disabled={cargando}>
          Reiniciar sistema
        </button>
      )}
    </main>
  );
}
