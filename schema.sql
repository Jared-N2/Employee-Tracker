DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
 id INT PRIMARY KEY AUTO_INCREMENT,
 firt_name VARCHAR(30) NULL,
 last_name VARCHAR(30) NULL,
 role_id INT,
 manager_id INT
);

CREATE TABLE role (
 id INT PRIMARY KEY AUTO_INCREMENT,
 title VARCHAR(30) NULL,
 salary DECIMAL(6, 2),
 department_id INT
);

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NULL
);