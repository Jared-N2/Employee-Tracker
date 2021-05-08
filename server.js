const mysql = require('mysql');
const {prompt} = require('inquirer');


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
            'Remove employee',
            'update employee role',
            'Update employee Manager'
        ],
    })
        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    employeeSearch();
                    break;

                case 'View all employees by department':
                    departmentSearch();
                    break;

                case 'View all employees by Manager':
                    managerSearch();
                    break;

                case 'Add employee':
                    addEmployee();
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
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const employeeSearch = () => {

    const query = 'SELECT  * FROM emplemopyees';
    connection.query(query), (err, res) => {
        console.table(res)
    };

};

employeeSearch();


