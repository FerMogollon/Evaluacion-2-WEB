// Dinero: máximo 2 decimales, sin ceros sobrantes (500 -> "500", 12.5 -> "12.5").
export const creditos = (n) => `${Number(Number(n).toFixed(2))} Cr`;

// Milisegundos -> "mm:ss"
export const reloj = (ms) => {
  const totalSegundos = Math.ceil(ms / 1000);
  const minutos = String(Math.floor(totalSegundos / 60)).padStart(2, "0");
  const segundos = String(totalSegundos % 60).padStart(2, "0");
  return `${minutos}:${segundos}`;
};
