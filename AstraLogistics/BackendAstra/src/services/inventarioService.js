import { inventario } from "../data/store.js";

// Copias, para que nadie fuera del service mute el array global por accidente.
export const listarInventario = () => inventario.map((equipo) => ({ ...equipo }));

export const buscarEquipo = (id) => inventario.find((equipo) => equipo.id === id);
