import express from 'express';
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import { BASE_QUERY, LOCALDB } from "constants/const.js";
import { createQuery } from "./dataBaseQuery.js";
import { Letters } from './types/types.js';
// import { fileURLToPath } from "url"
// import path from "path"

// Create a new database
const db = new sqlite3.Database(LOCALDB);

// Static file serving
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
// Middleware
app.use(bodyParser.json());

app.post("/api", (req, res) => {
    const letters: Letters = req.body; // Recive a JSON with the words
    let query = BASE_QUERY;
    
    query += createQuery(letters);
    console.log(query);
    
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        console.log(rows);
        res.json({ words: rows });
    });
});

app.get("/api", (_req, res) => {
    res.send("No get requests allowed :)");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
