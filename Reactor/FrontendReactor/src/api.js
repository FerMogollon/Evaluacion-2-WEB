const BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function post(path, body) {
  let res;
  try {
    res = await fetch(BASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("No hay conexión con el reactor. Verifica que el backend esté corriendo.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Ocurrió un error inesperado");
  return data;
}

// -> { resultado: "estabilizado" | "mas_alta" | "mas_baja", mensaje }
export const ajustarTemperatura = (temperatura) => post("/adjust", { temperatura });

// -> { mensaje }
export const reiniciarSistema = () => post("/reboot");
