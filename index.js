const fs = require('fs');
const inquirer = require('inquirer');
const connection = require('./db/connection');
const util = require('util');
connection.query = util.promisify(connection.query);
require('console.table')


// Function to start the app on node
function menu() {
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    }]).then(({ choice }) => {
        switch (choice) {
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
            case 'Quit':
                connection.end();
                break;
        }
    })
};

menu()


// Function called to view all the departments in a table
function viewDepartments() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data)
        menu()
    })
};


// Function called to view the roles and the departments they are linked to 
function viewRoles() {

    connection.query("SELECT role.id, role.title, department.name AS department_name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;", (err, data) => {
        if (err) throw err;
        console.table(data)
        menu()
    })
};

// Function to view the employee details
function viewEmployees() {

    connection.query(`SELECT employee.id, employee.first_name AS "first name", employee.last_name 
    AS "last name", role.title, department.name AS department, role.salary, 
    concat(manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee manager
    ON manager.id = employee.manager_id`, (err, data) => {
        if (err) throw err;
        console.table(data)
        menu()
    })
};

// Function to add a department
function addDepartment() {
    inquirer.prompt({
        name: 'name',
        message: 'Please enter the department name: '
    }).then(answer => {
        connection.query(`INSERT INTO department (name) VALUES ('${answer.name}')`, (err, data) => {
            if (err) throw err;
            menu()
        })
    })
};

// Function to add a role
function addRole() {
    connection.query('SELECT * FROM department;', (err, data) => {
        const departmentOptions = data.map(({ id, name }) => ({
            name: name,
            value: id
        }))

        inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'please select from the following list: ',
                choices: departmentOptions
            },
            {
                type: 'text',
                name: 'new_role',
                message: 'please enter the name of the new role you want to add: ',
            },
            {
                type: 'text',
                name: 'salary',
                message: 'please enter the salary for the new role: ',
            },
        ]).then(answers => {
            connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.new_role}','${answers.salary}','${answers.department_id}')`, (err, data) => {
                if (err) throw err;
                console.log('The new role is added successfully');
                menu()
            })
        })
    });
}

// Function to add an employee
function addEmployee() {
    connection.query('SELECT * FROM role;', (err, data) => {
        const roleOptions = data.map(role => role.title);


        connection.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL', (err, employeeData) =>{
            if (err) throw err;
            const managerOptions = employeeData.map(employee =>{
                return{
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }

            })
            managerOptions.unshift({ name: 'None', value: null });
            
            
            inquirer.prompt([
                {
                    type: 'text',
                    name: 'first_name',
                    message: 'Please enter the Employees First Name: ',
                },
                {
                    type: 'text',
                    name: 'last_name',
                    message: 'Please enter the Employees Last Name: ',
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please choose the role of the employee from the following list: ',
                    choices: roleOptions,
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Please choose the manager for the employee: ',
                    choices: managerOptions,
                }
            ]).then(answers => {
                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                SELECT '${answers.first_name}','${answers.last_name}', r.id, '${answers.manager}' FROM employee e LEFT JOIN role r on e.role_id = r.id WHERE r.title = '${answers.role}'`, (err, data) => {
                    if (err) throw err;
                    console.log('Employee added successfully');

                    menu();
              
                }
                );
            });
        });
    })
    }

    // Function to update an employee role
    function updateEmployeeRole(){

    }
    
