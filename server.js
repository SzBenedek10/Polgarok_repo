const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const db = new sqlite3.Database('polgarok.db');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Tábla létrehozása
db.run(`
    CREATE TABLE IF NOT EXISTS polgarok (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        polgar_id INTEGER,
        nev TEXT,
        szuletesi_datum TEXT,
        lakcim TEXT,
        szemelyi_szam TEXT,
        neme TEXT
    )
`);

// Adatok fogadása és mentése
app.post('/users', (req, res) => {
    const { polgar_id, nev, szuletesi_datum, lakcim, szemelyi_szam, neme } = req.body;

    const stmt = `
        INSERT INTO polgarok (polgar_id, nev, szuletesi_datum, lakcim, szemelyi_szam, neme)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(stmt, [polgar_id, nev, szuletesi_datum, lakcim, szemelyi_szam, neme], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Adatmentési hiba történt.');
        }
        res.status(200).send('Sikeres mentés!');
    });
});

// Szerver indítása
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
});