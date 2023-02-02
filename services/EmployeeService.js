const DbContext = require('../src/DbContext');

class EmployeeService {
    constructor(){
        this.DbContext = new DbContext();
    }

    getAllEmployee() {
        const query = 'SELECT * FROM products';
        this.DbContext.useQuery(query);
    }
}

module.exports = EmployeeService;