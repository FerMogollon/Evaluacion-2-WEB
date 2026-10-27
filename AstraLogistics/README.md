# AstroLogistics

Aplicación web para preparar la carga de una nave antes de que expire la ventana de lanzamiento. El proyecto tiene un backend Express y un frontend React con Vite.

## Requisitos

- Node.js 18 o posterior
- npm (se instala junto con Node.js)
- Git, si vas a clonar el repositorio

## Instalación y ejecución

Después de descargar o clonar el repositorio, abre dos terminales en la carpeta raíz del repositorio.

### 1. Backend

En la primera terminal, instala las dependencias y crea tu configuración local:

```powershell
cd .\AstraLogistics\BackendAstra
Copy-Item .env.example .env
npm install
npm run dev
```

El backend queda en `http://localhost:3000`. El archivo `.env` debe estar en `AstraLogistics/BackendAstra`; no se sube a Git. Si ya tienes un `.env`, conserva el tuyo en vez de copiar la plantilla encima.

### 2. Frontend

En la segunda terminal:

```powershell
cd .\AstraLogistics\FrontendAstra
npm install
npm run dev
```

Abre la dirección que Vite muestra en la terminal, normalmente `http://localhost:5173`.

Para detener cada servidor, usa `Ctrl+C` en su terminal. Si cambias el `.env` del backend, reinícialo para que lea la nueva configuración.

## Configuración

El backend lee estas variables desde `BackendAstra/.env`:

| Variable | Valor predeterminado | Descripción |
| --- | --- | --- |
| `PORT` | `3000` | Puerto del backend |
| `CORS_ORIGIN` | `http://localhost:5173` | Origen de frontend que CORS permite en el navegador |
| `DURACION_MISION_MS` | `600000` | Duración de la misión en milisegundos (600000 ms = 10 minutos) |

El frontend usa `http://localhost:3000` por defecto. Para apuntarlo a otra dirección, crea `FrontendAstra/.env` con una variable como:

```env
VITE_API_URL=http://localhost:3000
```

Vite lee las variables `VITE_` al arrancar; reinicia el frontend después de modificarlas.

## Cómo funciona

1. El frontend carga el inventario y el estado de la carga al abrirse. Las llamadas HTTP están centralizadas en `FrontendAstra/src/services/api.js`.
2. Express recibe las solicitudes, las dirige a las rutas de inventario, carga o misión y ejecuta sus controladores y servicios.
3. El backend mantiene el inventario, la carga y los tiempos de misión en memoria en `BackendAstra/src/data/store.js`. Al agregar suministros, descuenta unidades del inventario y actualiza el costo de la carga.
4. El frontend muestra el inventario, el presupuesto, la carga y el tiempo restante. Las respuestas del backend actualizan su estado de React.
5. El temporizador de la misión comienza con la primera solicitud de carga. Las operaciones de carga verifican que la misión siga vigente.
6. Reiniciar la misión devuelve las unidades a la base, limpia la carga y empieza una nueva ventana de lanzamiento.

El inventario, la carga y el temporizador no se guardan en una base de datos. Se reinician a sus valores iniciales cuando se reinicia el backend.

## API principal

| Método | Ruta | Uso |
| --- | --- | --- |
| `GET` | `/api/health` | Comprueba que el backend responda |
| `GET` | `/api/inventario` | Consulta los suministros disponibles |
| `GET` | `/api/carga` | Consulta la carga, presupuesto y tiempo restante |
| `POST` | `/api/carga/agregar` | Agrega unidades. JSON: `{"equipoId": 201, "cantidad": 1}` |
| `PUT` | `/api/carga/actualizar-unidades/:id` | Establece la cantidad final. JSON: `{"cantidad": 2}` |
| `DELETE` | `/api/carga/eliminar/:id` | Retira un suministro de la carga |
| `POST` | `/api/mision/reiniciar` | Devuelve la carga y comienza una misión nueva |

Las rutas de carga requieren que la misión siga vigente. Si expira, el backend devuelve un error y el frontend informa que la ventana de lanzamiento se cerró.

## Compilación del frontend

Para generar la versión de producción del frontend:

```powershell
cd .\AstraLogistics\FrontendAstra
npm run build
```

## Solución de problemas

- **El frontend no conecta:** comprueba que el backend siga activo en el puerto `3000` y que `VITE_API_URL` apunte a esa dirección.
- **Error de CORS:** revisa que `CORS_ORIGIN` coincida exactamente con el origen que Vite muestra en la terminal, incluyendo el puerto.
- **El puerto ya está ocupado:** detén la otra aplicación que lo esté usando o configura otro puerto y actualiza también la URL del frontend y `CORS_ORIGIN`.
- **Node o npm no se reconocen:** instala Node.js 18 o posterior y abre una terminal nueva.

> **Nota:** ambos frontends usan el puerto `5173` por defecto. Astra puede elegir otro puerto si `5173` ya está ocupado; Reactor, en cambio, está configurado con `strictPort` y no arrancará mientras ese puerto esté ocupado. Para ejecutar ambos al mismo tiempo, configura un puerto diferente para uno de los frontends y actualiza el `CORS_ORIGIN` de su backend para que coincida con el origen real.
