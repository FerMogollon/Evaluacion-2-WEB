const express = require("express");

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Servidor de Reactor funcionando.");
});

app.get("/api/status", (req, res) => {
  res.json({ message: "Conexión con el backend de Reactor establecida." });
});

app.listen(PORT, () => {
  console.log(`Reactor listo en http://localhost:${PORT}`);
});
