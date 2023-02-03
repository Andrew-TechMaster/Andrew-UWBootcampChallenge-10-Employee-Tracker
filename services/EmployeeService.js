const DbContext = require('../src/DbContext');

class EmployeeService {
    DbContext;

    constructor(){
        this.DbContext = new DbContext();
    }

    async getAllEmployeesAsync() {
        const query = 'SELECT * FROM employees';
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.table(rows); });
    }

    getAllEmployee() {
        const query = 'SELECT * FROM products';
        this.DbContext.useQuery(query);
    }

    addEmployee() {}

    updateEmployeeRole() {}
}

module.exports = EmployeeService;