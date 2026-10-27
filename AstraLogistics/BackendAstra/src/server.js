import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, () => {
  console.log(`AstroLogistics listo en http://localhost:${PORT}`);
});
