# Estabiliza el Reactor

Aplicación web para adivinar la temperatura de estabilización de un reactor. El proyecto está separado en un backend Express y un frontend React con Vite.

## Requisitos

- Node.js 18 o posterior
- npm (se instala junto con Node.js)
- Git, si vas a clonar el repositorio

## Instalación y ejecución

Después de descargar o clonar el repositorio, abre dos terminales en la carpeta raíz del repositorio.

### 1. Backend

En la primera terminal, instala las dependencias y configura las variables locales:

```powershell
cd .\Reactor\BackendReactor
Copy-Item .env.example .env
npm install
npm run dev
```

El backend queda en `http://localhost:3001`. El archivo `.env` debe estar en `Reactor/BackendReactor`; no se sube a Git. Si ya tienes un `.env`, conserva el tuyo en vez de copiar la plantilla encima.

### 2. Frontend

En la segunda terminal:

```powershell
cd .\Reactor\FrontendReactor
npm install
npm run dev
```

Abre la dirección que Vite muestra en la terminal, normalmente `http://localhost:5173`.

Para detener cada servidor, usa `Ctrl+C` en su terminal. Si cambias el `.env` del backend, reinícialo para que lea la nueva configuración.

## Configuración

El backend lee estas variables desde `BackendReactor/.env`:

| Variable | Valor predeterminado | Descripción |
| --- | --- | --- |
| `PORT` | `3001` | Puerto del backend |
| `CORS_ORIGIN` | `http://localhost:5173` | Origen de frontend que CORS permite en el navegador |

El frontend usa `http://localhost:3001` por defecto. Para apuntarlo a otra dirección, crea `FrontendReactor/.env` con una variable como:

```env
VITE_API_URL=http://localhost:3001
```

Vite lee las variables `VITE_` al arrancar; reinicia el frontend después de modificarlas.

## Cómo funciona

1. `BackendReactor/src/data/store.js` genera una temperatura secreta entre 1 y 100 y la mantiene en memoria en `reactor.temperatura`.
2. El frontend envía cada intento por HTTP usando `fetch`, desde `FrontendReactor/src/api.js`.
3. Express recibe la petición, valida el dato en el controlador y el servicio compara el intento con la temperatura secreta.
4. El backend devuelve un resultado (`mas_alta`, `mas_baja` o `estabilizado`) y un mensaje. El frontend actualiza la lectura y el historial de intentos.
5. El botón para reiniciar solicita una temperatura nueva y limpia el estado del juego en el frontend.

La temperatura secreta y el historial no se guardan en una base de datos: el servidor los mantiene en memoria (el historial está en el estado de React). Al reiniciar el servidor se genera otra temperatura; al recargar la página se pierde el historial visible.

El servicio registra en la consola del backend que se generó una temperatura cuando `NODE_ENV` no es `production`. El mensaje actual no revela su valor.

## API principal

| Método | Ruta | Uso |
| --- | --- | --- |
| `GET` | `/api/health` | Comprueba que el backend responda |
| `POST` | `/adjust` | Evalúa un intento. JSON: `{"temperatura": 50}` |
| `POST` | `/reboot` | Genera una nueva temperatura secreta |

## Compilación del frontend

Para generar la versión de producción del frontend:

```powershell
cd .\Reactor\FrontendReactor
npm run build
```

## Solución de problemas

- **El frontend no conecta:** comprueba que el backend siga activo en el puerto `3001` y que `VITE_API_URL` apunte a esa dirección.
- **Error de CORS:** revisa que `CORS_ORIGIN` coincida exactamente con el origen del frontend, incluyendo el puerto.
- **El puerto ya está ocupado:** detén la otra aplicación que lo esté usando o configura otro puerto y actualiza también la URL del frontend y `CORS_ORIGIN`.
- **Node o npm no se reconocen:** instala Node.js 18 o posterior y abre una terminal nueva.

