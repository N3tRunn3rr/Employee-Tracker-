INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 80000, 1),
       ('Lead Engineer', 200000, 2),
       ('Software Engineer', 180000, 2),
       ('Accountant', 125000, 3),
       ('Lawyer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Mike', 'Chan', 2, 1),
       ('Ashley', 'Rodriguez', 3, NULL),
       ('Kevin', 'Tupik', 4, 3),
       ('Malia', 'Brown', 5, NULL),
       ('Sarah', 'Lourd', 6, NULL),
       ('Tom', 'Allen', 7, 6);