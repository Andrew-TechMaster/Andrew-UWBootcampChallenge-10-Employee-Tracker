const DbContext = require('../config/DbContext');

class EmployeeService {
    DbContext;

    constructor() {
        this.DbContext = new DbContext();
    }

    async getAllEmployeesAsync() {
        const query = 'SELECT * FROM employees';
        const res = await this.DbContext.useQueryAsync(query);
        return res[0];
    }

    async displayAllEmployeesAsync() {
        const query = 'SELECT * FROM employees';
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.table(rows); });
    }

    async addEmployeeAsync(first_name, last_name, role_id, manager_id) {
        const query = `INSERT INTO employees(first_name, last_name, role_id, manager_id)
                       VALUES('${first_name}', '${last_name}', ${role_id}, ${manager_id});`
        await this.DbContext.useQueryAsync(query).then(() => console.log(`Employee:${first_name} ${last_name} has been added to the employees table`));
    }

    async updatedEmployeeRoleAsync(empId, updatedRoleId) {
        const query = `UPDATE employees
                       SET role_id = ${updatedRoleId}
                       WHERE employees.id = ${empId};`

        await this.DbContext.useQueryAsync(query).then(() => {
            console.log('\n');
            console.log(`Employee with id ${empId}'s role has been updated to role_id: ${updatedRoleId}`);
        });
    }

    async deleteEmployeeAsync(empId) {
        const query = `DELETE FROM employees WHERE id='${empId}';`;
        await this.DbContext.useQueryAsync(query).then(() => {
            console.log('\n');
            console.log(`Employee with ID:${empId} has been deleted from the employees table if exisited`);
        });
    }

    async displayEmployeeGroupByAsync(byWhat) {
        const query = `SELECT ${byWhat}, count(*) 
                       FROM employees 
                       INNER JOIN roles ON employees.role_id = roles.id
                       GROUP BY ${byWhat};`;
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.table(rows); });
    }

    getAllEmployee() {
        const query = 'SELECT * FROM products';
        this.DbContext.useQuery(query);
    }

}

module.exports = EmployeeService;