const DbContext = require('../src/DbContext');

class DepartmentService {
    DbContext;

    constructor() {
        this.DbContext = new DbContext();
    }

    async getAllDepartmentsAsync() {
        const query = 'SELECT * FROM departments;';
        const res = await this.DbContext.useQueryAsync(query);
        return res;
    }

    async displayAllDepartmentsAsync() {
        const query = 'SELECT * FROM departments;';
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.table(rows); });
    }

    async addDepartmentAsync(depName) {
        const query = `INSERT INTO departments(name) VALUES ('${depName}');`;
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.info(`${depName} has been added to the database`); })
    }

    async deleteDepartmentAsync(depName) {
        const query = `DELETE FROM departments WHERE name='${depName}';`;
        await this.DbContext.useQueryAsync(query).then(() => console.error(`${depName} has been deleted from the departement tabel if exisited`));
    }
}

module.exports = DepartmentService;