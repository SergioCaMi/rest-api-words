// app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const _ = require("lodash");

const app = express(); //  Crear instancia de Express
const PORT = process.env.PORT || 3000; // Puerto del servidor

// Cargar palabras desde archivo
const words = require("./data/words.json");
const languages = ["zh", "pt-br", "es", "de", "it", "fr"];

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Endpoints

// Iteración 1
app.get("/api/v1/words", (req, res) => {
  
  if (req.query.length) {
    let lengthWords = +req.query.length;
    if (isNaN(lengthWords) || lengthWords <= 0) {
      return res.json({ word: _.sample(words) });
    }
    const wordResult = words.filter((w) => w.length == lengthWords);
    if (wordResult.length > 0) {
      return res.json({ word: _.sample(wordResult) });
    } else {
      return res.status(404).send("No existen palabras con esa condición.");
    }
  } else {
    return res.json({ word: _.sample(words) });
  }
});

// Iteración 3

// app.get("/api/v2/languages", (req, res) => {
//   if (languages) {
//     res.json({ languages });
//   } else {
//     res.status(404).send("No existen lenguajes disponibles.");
//   }
// });

// Iteración 4
// app.get("/api/v2/words", async (req, res) => {
//   let getLang = "";
//   let getLenght = "";
//   let ampersand = "";
//   if (req.query.length) {
//     getLenght = `length=${req.query.length}`;
//   }
//   if (req.query.lang) {
//     getLang = `lang=${req.query.lang}`;
//   }
//   if (getLang && getLenght) {
//     ampersand = `&`;
//   }
//   const queryString = `https://random-word-api.herokuapp.com/word?${getLenght}${ampersand}${getLang}`;
//   const res = await fetch(queryString);
//   const data = await response.json();

//   res.json({ data });
// });

// 404 para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
