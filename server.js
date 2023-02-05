const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '46Boeboe58!@',
    database: 'employees_db'
})
