const DbContext = require('../src/DbContext');

class RoleService {
    DbContext;

    constructor(){
        this.DbContext = new DbContext();
    }

    async getAllRolesAsync() {
        const query = 'SELECT * FROM roles';
        const res = await this.DbContext.useQueryAsync(query);
        return res[0];
    }

    async displayAllRolesAsync() {
        const query = 'SELECT * FROM roles';
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.table(rows); });
    }

    async addRollAsync(title, salary, deptId) {
        const query = `INSERT INTO roles(title, salary, department_id)
                       VALUES ('${title}', ${salary}, ${deptId})`;
        await this.DbContext.useQueryAsync(query).then(() => console.log(`Role:${title} has been added to the roles table`));
    }

}

module.exports = RoleService;