const DbContext = require('../src/DbContext');

class EmployeeService {
    DbContext;

    constructor(){
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

    getAllEmployee() {
        const query = 'SELECT * FROM products';
        this.DbContext.useQuery(query);
    }

    addEmployee() {}

    updateEmployeeRole() {}
}

module.exports = EmployeeService;