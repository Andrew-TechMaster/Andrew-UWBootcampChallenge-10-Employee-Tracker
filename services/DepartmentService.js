const DbContext = require('../src/DbContext');

class DepartmentService {
    DbContext;

    constructor(){
        this.DbContext = new DbContext();
    }


    async getAllDepartmentsAsync() {
        const query = 'SELECT * FROM departments';
        await this.DbContext.useQueryAsync(query);
    }

}

module.exports = DepartmentService;