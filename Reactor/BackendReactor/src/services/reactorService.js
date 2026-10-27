import { reactor, generarTemperatura } from "../data/store.js";

const logTemperatura = () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("[reactor] temperatura de estabilización generada");
  }
};

export const iniciarReactor = () => logTemperatura();

export const reiniciarReactor = () => {
  reactor.temperatura = generarTemperatura();
  logTemperatura();
};

// Si el intento es MENOR que la ideal, la ideal es "más alta" (y viceversa).
export const evaluarIntento = (intento) => {
  if (intento === reactor.temperatura) {
    return { resultado: "estabilizado", mensaje: "¡Reactor estabilizado!" };
  }
  if (intento < reactor.temperatura) {
    return { resultado: "mas_alta", mensaje: "La temperatura ideal es más alta" };
  }
  return { resultado: "mas_baja", mensaje: "La temperatura ideal es más baja" };
};
