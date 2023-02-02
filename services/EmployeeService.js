const DbContext = require('../src/DbContext');

class EmployeeService {
    DbContext;

    constructor(){
        this.DbContext = new DbContext();
    }

    getAllEmployee() {
        const query = 'SELECT * FROM products';
        this.DbContext.useQuery(query);
    }

    addEmployee() {

    }

    updateEmployeeRole() {

    }
}

module.exports = EmployeeService;