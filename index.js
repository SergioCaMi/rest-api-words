// app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const _ = require("lodash");

const app = express(); //  Crear instancia de Express
const PORT = process.env.PORT || 3000; // Puerto del servidor

// Cargar palabras desde archivo
const words = require("./data/words.json");

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Endpoints

// Iteración 1
app.get("/api/v1/words", (req, res) => {
  if (req.query.length) {
    const lengthWords = req.query.length;
    const wordResult = words.filter((w) => w.length == +lengthWords);
    if (wordResult.length > 0) {
      res.json({ word: _.sample(wordResult) });
    } else {
      res.status(404).send("No existen palabras con esa condición.");
    }
  } else {
    res.json({ word: _.sample(words) });
  }
});

// Iteración 2

// Iteración 3

// Iteración 4

// 404 para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
