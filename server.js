const express = require('express');
const mysql = require('mysql2');
// require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

//view all departments 
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success, here are the departments',
            data: rows
        });
    });
});

//view all roles 
app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success, here are all the roles',
            data: rows
        });
    });
});

//view all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success, here are all the employees',
            data: rows
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});