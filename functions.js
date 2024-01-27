const connection = require('./db/connection');
const util = require('util');
connection.query = util.promisify(connection.query);


async function viewDepartments() {
    const department = await connection.query("SELECT * FROM department")
    console.table(department);

};

async function viewRoles() {
    const roles = await connection.query("SELECT id, title FROM role")
    console.table(roles);

};

async function viewEmployees() {
    const employees = await connection.query("SELECT first_name, last_name FROM employee")
    console.table(employees);

};

// async function addDepartment


module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees

}