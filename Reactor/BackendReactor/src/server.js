import app from "./app.js";
import { PORT } from "./config.js";
import { iniciarReactor } from "./services/reactorService.js";

iniciarReactor();

app.listen(PORT, () => {
  console.log(`Reactor listo en http://localhost:${PORT}`);
});
