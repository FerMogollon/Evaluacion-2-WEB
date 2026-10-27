// Capa de comunicación con el backend (REST + promesas con fetch).
// Cada función devuelve una Promise; los componentes la consumen con async/await o .then().

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const peticion = async (ruta, opciones = {}) => {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
    });
  } catch {
    // fetch solo rechaza cuando no hay conexión con el servidor
    throw new Error("No se pudo conectar con el servidor. ¿Está corriendo el backend?");
  }

  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    // El backend siempre responde { mensaje, ...extras }
    const error = new Error(datos.mensaje ?? "Error inesperado del servidor");
    error.status = respuesta.status;
    error.expirada = datos.expirada === true; // 410: se cerró la ventana de lanzamiento
    throw error;
  }
  return datos;
};

// Endpoint 1: GET /api/inventario
export const obtenerInventario = () => peticion("/api/inventario");

// Endpoint 2: GET /api/carga
export const obtenerCarga = () => peticion("/api/carga");

// Endpoint 3: POST /api/carga/agregar
export const agregarSuministro = (equipoId, cantidad = 1) =>
  peticion("/api/carga/agregar", {
    method: "POST",
    body: JSON.stringify({ equipoId, cantidad }),
  });

// Endpoint 4: PUT /api/carga/actualizar-unidades/:id  (cantidad FINAL, no incremento)
export const actualizarUnidades = (id, cantidad) =>
  peticion(`/api/carga/actualizar-unidades/${id}`, {
    method: "PUT",
    body: JSON.stringify({ cantidad }),
  });

// Endpoint 5: DELETE /api/carga/eliminar/:id
export const eliminarSuministro = (id) =>
  peticion(`/api/carga/eliminar/${id}`, { method: "DELETE" });

// Extra: POST /api/mision/reiniciar
export const reiniciarMision = () => peticion("/api/mision/reiniciar", { method: "POST" });
