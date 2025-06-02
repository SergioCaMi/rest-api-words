# REST API Words

Este proyecto es una API REST para obtener palabras aleatorias y soporta dos versiones principales:

## Versión 1 (v1)

- **Endpoint:** `/api/v1/words`
- **Método:** GET
- **Parámetros opcionales:**
  - `length`: Filtra palabras por longitud.
- **Respuesta:** Devuelve una palabra aleatoria del listado local (`words.json`).

**Ejemplo:**
```
GET /api/v1/words?length=5
```

---

## Versión 2 (v2)

- **Endpoint:** `/api/v2/words`
- **Método:** GET
- **Parámetros opcionales:**
  - `length`: Longitud de la palabra.
  - `lang`: Idioma de la palabra (por ejemplo: es, en, fr, etc.).
- **Respuesta:** Devuelve una palabra aleatoria obtenida de la API externa https://random-word-api.herokuapp.com/word

**Ejemplo:**
```
GET /api/v2/words?length=5&lang=es
```

- **Endpoint:** `/api/v2/languages`
- **Método:** GET
- **Respuesta:** Devuelve los idiomas soportados.

---

## Cómo ejecutar

1. Instala las dependencias:
   ```
   npm install
   ```
2. Inicia el servidor:
   ```
   npm start
   ```
3. Accede a la interfaz web en `http://localhost:3000`.

---

## Créditos
- Proyecto para IronHack - Módulo 2