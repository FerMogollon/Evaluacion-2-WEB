import { useState, useEffect } from "react";
import { Badge } from "reactstrap";
import { reloj } from "../utils/formato.js";

// Cuenta regresiva local. El backend manda tiempoRestanteMs en cada respuesta de carga;
// aquí solo lo hacemos "correr" cada segundo.
function Temporizador({ tiempoRestanteMs, onExpirar }) {
  const [restante, setRestante] = useState(tiempoRestanteMs);

  useEffect(() => {
    const finEn = Date.now() + tiempoRestanteMs;
    setRestante(tiempoRestanteMs);

    const intervalo = setInterval(() => {
      const ms = Math.max(0, finEn - Date.now());
      setRestante(ms);
      if (ms === 0) {
        clearInterval(intervalo);
        onExpirar();
      }
    }, 500);

    return () => clearInterval(intervalo); // limpieza al desmontar / recibir nuevo tiempo
  }, [tiempoRestanteMs]); // eslint-disable-line react-hooks/exhaustive-deps

  const urgente = restante < 60_000;
  return (
    <Badge pill color={urgente ? "danger" : "warning"} className="chip chip-reloj">
      Ventana: {reloj(restante)}
    </Badge>
  );
}

export default Temporizador;
