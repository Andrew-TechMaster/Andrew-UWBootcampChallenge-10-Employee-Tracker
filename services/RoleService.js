const DbContext = require('../src/DbContext');

class RoleService {
    DbContext;

    constructor(){
        this.DbContext = new DbContext();
    }


    async getAllRolesAsync() {
        const query = 'SELECT * FROM roles';
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.table(rows); });
    }

}

module.exports = RoleService;