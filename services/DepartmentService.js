const DbContext = require('../src/DbContext');

class DepartmentService {
    DbContext;

    constructor() {
        this.DbContext = new DbContext();
    }


    async getAllDepartmentsAsync() {
        const query = 'SELECT * FROM departments';
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.table(rows); });
    }

    async addDepartmentAsync(depName) {
        const query = `INSERT INTO departments(name) VALUES ('${depName}')`;
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.info(`${depName} has been added to the database`); })
    }
}

module.exports = DepartmentService;