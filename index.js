// app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const _ = require("lodash");
const cors = require('cors');
const fs = require("fs");

const app = express(); //  Crear instancia de Express
const PORT = process.env.PORT || 3000; // Puerto del servidor

// Cargar palabras desde archivo
const words = require("./data/words.json");
const languages = ["zh", "pt-br", "es", "de", "it", "fr"];

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


// deshabilitamos la seguridad CORS
app.use(cors());

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

app.get("/api/v2/languages", (req, res) => {
  if (languages) {
    res.json({ languages });
  } else {
    res.status(404).send("No existen lenguajes disponibles.");
  }
});

// Iteración 4
app.get("/api/v2/words", async (req, res) => {
  let getLang = "";
  let getLenght = "";
  if (req.query.length) {
    getLenght = `length=${req.query.length}`;
  }
  if (req.query.lang) {
    if (req.query.length){
    getLang = `&lang=${req.query.lang}`;
    }else{
    getLang = `lang=${req.query.lang}`;
    }
  }
  const queryString = `https://random-word-api.herokuapp.com/word?${getLenght}${getLang}`;
  const response = await fetch(queryString);
  const data = await response.json();
  console.log(!words.includes(data[0]));
  if (!words.includes(data[0])){
    console.log(words + " original");

    words.push(data[0]);
    console.log(words);
    fs.writeFileSync("./data/words.json", JSON.stringify(words, null, 2));
  }
  res.json({ "word": data[0] || "No se encontró palabra" });
});


// BONUS 2
app.get("/api/v1/words/all", (req, res) => {
  
  res.json({words: words || "No existen palabras disponibles."});
});
 

app.get("/api/v1/words/:index", (req, res) => {
  const index = +req.params.index;
  if (isNaN(index) || index < 0 || index >= words.length) {
    return res.status(404).json({ error: "Índice no válido" });
  }
  res.json({ word: words[index] });
});


// 404 para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
