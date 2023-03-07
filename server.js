const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// const PORT = process.env.PORT || 3306;
const app = express();

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userChoice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    .then((answer) => {
        switch (answer.userChoice) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                exit();
                break;
        }
    });
}


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '46Boebo58!@',
    database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

db.connect(function(err) {
    if (err) throw err;
    console.log('connected as id ' + db.threadId);
    init();
})

//view all departments 
function viewDepartments() {
    console.log('Viewing all departments');

    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result)
        console.log(cTable.getTable(result));
        console.log('Success, here are all the departments: ' + result);
    });
};

//view all roles 
function viewRoles() {
    console.log('Viewing all roles');

    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log('Success, here are all the roles: ' + result);
    });
};

//view all employees
function viewEmployees() {
    console.log('Viewing all employee');

    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log('Success, here are all the employees: ' + result);
    });
};

//add a department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you would like to add?'

        }
    ])
    .then((answer) => {
        const params = answer.department;
        db.query(`INSERT INTO department (name) VALUES (?)`, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Success, department added: ' + result);
            console.table(result);
        });
    });
};

//add a role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role you would like to add?'

        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role you would like to add?'

        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id of the role you would like to add?'

        }
    ])
    .then((answer) => {
        const params = [answer.title, answer.salary, answer.department_id];
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Success, role added: ' + result);
            console.table(result);
        });
    });
};

//add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee you would like to add?'

        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee you would like to add?'

        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role id of the employee you would like to add?'

        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager id of the employee you would like to add?'
            
        }
    ])
    .then((answer) => {
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Success, employee added: ' + result);
            console.table(result);
        });
    });
};

//update an employee role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role id of the employee you would like to update?'

        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee you would like to update?'

        }
    ])
    .then((answer) => {
        const params = [answer.role_id, answer.id];
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Success, employee role updated: ' + result);
            console.table(result);
        });
    });
};
