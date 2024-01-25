
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./gik339-projekt.db');
const express = require('express');
const server = express();

server
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');

        next();
    });
server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});


server.get('/bicycles', (req, res) => {
    const sql = 'SELECT * FROM bicycles';

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
});

server.get('/bicycles/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM bicycles WHERE id=${id}`;

    db.all(sql, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows[0]);
        }
    });
});

server.post('/bicycles', (req, res) => {
    const bicycle  = req.body;
    const sql = `INSERT INTO bicycles (model, manufacturer, year, color) VALUES (?, ?, ?, ?)`;

    db.run(sql, Object.values(bicycle), (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Bicycle added');
        }
    });
});

server.put('/bicycles', (req, res) => {
    const bodyData = req.body;

    const id = bodyData.id;
    const bicycle = {
    model: bodyData.model,
    manufacturer: bodyData.manufacturer,
    year: bodyData.year,
    color: bodyData.color
};
    let updateString = '';
    const columnsArray = Object.keys(bicycle );
    columnsArray.forEach((column, i) => {
        updateString += `${column}="${bicycle [column]}"`;
        if (i !== columnsArray.length - 1) updateString += ',';
    });
    const sql = `UPDATE bicycles  SET ${updateString} WHERE id=${id}`;

    db.run(sql, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Bicycle updated');
        }
    });

});

server.delete('/bicycles/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM bicycles WHERE id = ${id}`;

    db.run(sql, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send('Bicycle deleted');
        }
    });
});