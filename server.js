const mysql = require('mysql');
const { prompt } = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'Mulligan123!',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected!')
    employee();
});

const employee = () => {
    prompt({
        name: 'employee',
        message: 'What would you like to do?',
        type: 'list',
        choices: [
            'View all employees',
            'View all employees by department',
            'View all employees by Manager',
            'Add employee',
            'Add department',
            'Add role',
            'Remove employee',
            'update employee role',
            'Update employee Manager',
            'EXIT'
        ],
    })
        .then((answer) => {
            switch (answer.employee) {
                case 'View all employees':
                    employeeSearch();
                    break;

                case 'View all employees by department':
                    departmentSearch();
                    break;

                case 'View all employee roles':
                    roleSearch();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Remove employee':
                    removeEmployee();
                    break;

                case 'update employee role':
                    updateRole();
                    break;

                case 'Update employee Manager':
                    updateManager();
                    break;

                default:
                    process.exit();
                    break;
            }
        });
};

const employeeSearch = () => {

    const query = 'SELECT  * FROM employee';
    connection.query(query), (err, res) => {
        console.table(res)
        employee()
    };

};
const departmentSearch = () => {

    const query = 'SELECT  * FROM department';
    connection.query(query), (err, res) => {
        console.table(res)
        employee()
    };

};
const roleSearch = () => {

    const query = 'SELECT  * FROM role';
    connection.query(query), (err, res) => {
        console.table(res)
        employee()
    };

};

const addEmployee = () => {

    prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'what is the employees role id?',
            name: 'role_id'
        }

    ]).then((employee) => {
        connection.query("INSERT INTO employee SET ?", employee)
    })

};

const addDepartment = () => {
    prompt(
        {
            type: 'input',
            message: 'What department do you want to create?',
            name: 'department'
        }
    ).then(function (answer) {
        connection.query(
            `INSERT INTO department SET ?`,
            {
                name: answer.department
            })
            employee();

    })
    
};

const addRole = () => {
        prompt([
            {
                type: 'input',
                message: 'What is the employees role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'What is the employees salary?',
                name: 'salary'
            },
            {
                type: 'input',
                message: 'what department does the employee work in?',
                name: 'department'
            }

        ]).then(function (answer) {
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    role_id: answer.role,
                    salary: answer.salary,
                    department_id: answer.department
                })
                employee();

            })
};
            
// employee();


