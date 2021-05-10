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
            'Add roles',
            'Remove employee',
            'update employee roles',
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
                    rolesSearch();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add roles':
                    addroles();
                    break;

                case 'Remove employee':
                    removeEmployee();
                    break;

                case 'update employee roles':
                    updateroles();
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
const rolesSearch = () => {

    const query = 'SELECT  * FROM roles';
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
            message: 'what is the employees roles id?',
            name: 'roles_id'
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

const addroles = () => {
        prompt([
            {
                type: 'input',
                message: 'What is the employees roles?',
                name: 'roles'
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
                `INSERT INTO roles SET ?`,
                {
                    title: answer.roles,
                    salary: answer.salary,
                    department_id: answer.department
                }, function (error) {
                    if (error) throw error;})
    
                employee();

            })
};

connection.connect((err) => {
    if (err) throw err;
    console.log('connected!')
    employee();
});
            
// employee();


