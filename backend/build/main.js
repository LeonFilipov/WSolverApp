import express from 'express';
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import { ACCEPTED_ORIGINS, LOCAL_DB } from "./constants/const.js";
import { createQuery } from "./dataBaseQuery.js";
import { lettersSchema } from './validation/lettes.js';
import cors from 'cors';
// Create a new database
const db = new sqlite3.Database(LOCAL_DB);
const app = express();
// Middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not accepted CORS'));
    }
}));
// API
app.post("/api", (req, res) => {
    const parsedJSON = lettersSchema.safeParse(req.body); // Recive a JSON with the words
    if (parsedJSON.success) {
        const letters = parsedJSON.data;
        const query = createQuery(letters);
        db.all(query, (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' }); // Error 500 -> internal server error
            }
            res.json({ words: rows });
        });
    }
    else {
        return res.status(400).json({ message: 'Bad validation' }); // Error 400 -> bad request
    }
});
// app.get("/api", (_req, res) => {
//     res.send("No get requests allowed :)");
// });
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
