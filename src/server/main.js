import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import ViteExpress from "vite-express";
import sqlite3 from "sqlite3";

// Create a new database
const db = new sqlite3.Database("WordleSolver.db");
const base = "SELECT * FROM words WHERE ";

// Query creation
const createQuery = (wordJson) => {
  let query = '';
  for (let word of wordJson.words){
    for (let p of word.perfect) {
      query += `SUBSTR(word, ${p.position}, 1) = '${p.letter}' AND `;
    }
    for (let c of word.correct) {
      query += `NOT SUBSTR(word, ${c.position}, 1) = '${c.letter}' AND word LIKE '%${c.letter}%' AND `;
    }
    for (let a of word.absent) {
      query += `NOT word LIKE '%${a}%' AND `;
    }
  }
  query = query.slice(0, -5);
  return query + ";";
};

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

// API
app.post("/api", (req, res) => {
  const words = req.body.words; // Recive a JSON with the words
  let query = base;
  query += createQuery(words);
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.json({ words: rows });
  });
});

app.get("/api", (req, res) => {
  res.send("No get requests allowed :)");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
