const express = require('express');
const { Pool } = require('pg');  
const cors = require('cors');

const app = express();
const port = 3000;


const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,  
});


app.use(cors());
app.use(express.json());


app.post('/add-book', (req, res) => {
    const { title, author, genre, pubDate, isbn } = req.body;
    const query = `INSERT INTO Inventory (title, author, genre, publication_date, isbn)
                   VALUES ($1, $2, $3, $4, $5)`;
    pool.query(query, [title, author, genre, pubDate, isbn], (err) => {
        if (err) return res.status(500).send("Error adding book");
        res.status(200).send("Book added successfully");
    });
});


app.get('/filter-books', (req, res) => {
    const { title, author, genre, pubDate } = req.query;
    const query = `SELECT * FROM Inventory WHERE 
                   ($1::text IS NULL OR title ILIKE '%' || $1 || '%')
                   AND ($2::text IS NULL OR author ILIKE '%' || $2 || '%')
                   AND ($3::text IS NULL OR genre ILIKE '%' || $3 || '%')
                   AND ($4::date IS NULL OR publication_date = $4)`;
    pool.query(query, [title, author, genre, pubDate], (err, result) => {
        if (err) return res.status(500).send("Error filtering books");
        res.json(result.rows);
    });
});


app.get('/export-books', (req, res) => {
    const format = req.query.format;
    const query = `SELECT * FROM Inventory`;

    pool.query(query, (err, result) => {
        if (err) return res.status(500).send("Error exporting books");

        if (format === 'csv') {
            const csvData = result.rows.map(row => `${row.title},${row.author},${row.genre},${row.publication_date},${row.isbn}`).join('\n');
            res.setHeader('Content-Disposition', 'attachment; filename="books.csv"');
            res.setHeader('Content-Type', 'text/csv');
            res.send(csvData);
        } else if (format === 'json') {
            res.setHeader('Content-Disposition', 'attachment; filename="books.json"');
            res.json(result.rows);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
