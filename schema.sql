DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL
);

CREATE TABLE roles (
 id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
 title VARCHAR(30) NULL,
 salary DECIMAL(6, 2),
 department_id INT,
 CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
-- role.department_id (will be a number)
CREATE TABLE employee (
 id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
 first_name VARCHAR(30) NULL,
 last_name VARCHAR(30) NULL,
 roles_id INT,
 manager_id INT,
 CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE
);
-- employee.role_id (will be a number)





