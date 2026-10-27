// "Base de datos" en memoria: arrays/objetos globales del módulo.
// IMPORTANTE: se exportan como const y se MUTAN en sitio (push, splice, length = 0).
// Si se reasignaran con `let`, los demás módulos no verían el cambio.

const crearInventarioInicial = () => [
  { id: 201, nombre: "Tanque de Oxígeno XL", categoria: "Soporte vital", precio: 50.0, stock: 5 },
  { id: 202, nombre: "Panel Solar Plegable", categoria: "Energía", precio: 80.0, stock: 3 },
  { id: 203, nombre: "Kit de Primeros Auxilios", categoria: "Medicina", precio: 25.0, stock: 10 },
  { id: 204, nombre: "Raciones Liofilizadas (x10)", categoria: "Alimentos", precio: 15.0, stock: 20 },
  { id: 205, nombre: "Purificador de Agua", categoria: "Soporte vital", precio: 60.0, stock: 4 },
  { id: 206, nombre: "Traje EVA Reforzado", categoria: "Equipo", precio: 120.0, stock: 2 },
  { id: 207, nombre: "Batería de Litio Compacta", categoria: "Energía", precio: 40.0, stock: 6 },
  { id: 208, nombre: "Baliza de Emergencia", categoria: "Comunicaciones", precio: 35.0, stock: 0 }, // agotado: sirve para probar el botón deshabilitado
];

export const inventario = crearInventarioInicial(); // [{ id, nombre, categoria, precio, stock }]
export const carga = []; // [{ id, cantidad }]
export const mision = { iniciadaEn: null, expiraEn: null }; // timestamps en ms

export const restaurarDatosAstro = () => {
  inventario.length = 0;
  inventario.push(...crearInventarioInicial());
  carga.length = 0;
  mision.iniciadaEn = null;
  mision.expiraEn = null;
};
