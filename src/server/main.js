import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import ViteExpress from "vite-express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";

// Create a new database
const db = new sqlite3.Database("WordleSolver.db");
const base = "SELECT * FROM Words5 WHERE ";

// Query creation
const createQuery = (wordJson) => {
  let query = '';
  const vocals = ['a', 'e', 'i', 'o', 'u'];
  const vocalsWithAccent = ['á', 'é', 'í', 'ó', 'ú'];
  for (let p of wordJson.perfect) {
    if (vocals.includes(p.letter)) {
      query += `SUBSTR(word, ${p.position}, 1) = '${vocalsWithAccent[vocals.indexOf(p.letter)]}' AND `;
    }
    query += `SUBSTR(word, ${p.position}, 1) = '${p.letter}' AND `;
  }
  for (let c of wordJson.correct) {
    if (vocals.includes(c.letter)) {
      query += `NOT SUBSTR(word, ${c.position}, 1) = '${vocalsWithAccent[vocals.indexOf(c.letter)]}' AND word LIKE '%${vocalsWithAccent[vocals.indexOf(c.letter)]}%' AND `;
    }
    query += `NOT SUBSTR(word, ${c.position}, 1) = '${c.letter}' AND word LIKE '%${c.letter}%' AND `;
  }
  for (let a of wordJson.absent) {
    if (a.position.length === 0) {
      if (vocals.includes(a.letter)) {
        query += `NOT word LIKE '%${vocalsWithAccent[vocals.indexOf(a.letter)]}%' AND `;
      }
      query += `NOT word LIKE '%${a.letter}%' AND `;
    }
    else {
      for (let pos of a.position) {
        if (vocals.includes(a.letter)) {
          query += `NOT SUBSTR(word, ${pos}, 1) = '${vocalsWithAccent[vocals.indexOf(a.letter)]}' AND `;
        }
        query += `NOT SUBSTR(word, ${pos}, 1) = '${a.letter}' AND `;
      }
    }
  }
  query = query.slice(0, -4);
  query += "ORDER BY RANDOM() LIMIT 10;";
  return query;
};

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
// API
app.post("/api", (req, res) => {
  const words = req.body; // Recive a JSON with the words
  let query = base;
  query += createQuery(words);
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    console.log(rows)
    res.json({ words: rows });
  });
});

app.get("/api", (req, res) => {
  res.send("No get requests allowed :)");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
