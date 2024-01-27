DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30), 
    salary DECIMAL,
    department_id INT NOT NULL,
    -- needs a foreign key referenced to department table id
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30), 
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    -- needs a foreign key referenced to role table id
    FOREIGN KEY(role_id) REFERENCES role(id),
    manager_id INT,
    -- needs a foreign key referenced to manager table id
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);

