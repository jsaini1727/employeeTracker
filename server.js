
const fs = require('fs');
const inquirer = require('inquirer');
const connection = require('./db/connection');

const util = require('util');
connection.query = util.promisify(connection.query);

function menu() {
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    }]).then(({ choice }) => {
        switch (choice){
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
async function viewDepartments(){
    const department = await connection.query("SELECT * FROM department")
    console.table (department);
    
    menu()
}

menu()



SELECT employee.id, employee.first_name AS "first name", employee.last_name 
                    AS "last name", role.title, department.name AS department, role.salary, 
                    concat(manager.first_name, " ", manager.last_name) AS manager
                    FROM employee
                    LEFT JOIN role
                    ON employee.role_id = role.id
                    LEFT JOIN department
                    ON role.department_id = department.id
                    LEFT JOIN employee manager
                    ON manager.id = employee.manager_id`