const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("¡Servidor Express funcionando!");
});

app.get("/api/status", (req, res) => {
    res.json({ message: "Conexión con el backend establecida." });
});

app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});