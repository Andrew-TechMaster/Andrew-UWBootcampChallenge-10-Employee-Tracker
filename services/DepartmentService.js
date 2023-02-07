const DbContext = require('../config/DbContext');

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
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => {
            console.log('\n');
            console.log(`${depName} has been added to the database`);
        })
    }

    async deleteDepartmentAsync(depName) {
        const query = `DELETE FROM departments WHERE name='${depName}';`;
        await this.DbContext.useQueryAsync(query).then(() => {
            console.log('\n');
            console.log(`${depName} has been deleted from the departements table if exisited`);
        });
    }

    // View the total utilized budget of a department
    async displayTotalBudgetOfAnDepartment() {
        const query = `SELECT departments.name, SUM(roles.salary) AS 'Total Budget', COUNT(employees.id) AS '# of Employees'
                           FROM departments 
                           INNER JOIN roles ON departments.id = roles.department_id
                           INNER JOIN employees ON roles.id = employees.role_id
                           GROUP BY departments.name
                           ORDER BY 'Total Budget' DESC;`;
        await this.DbContext.useQueryAsync(query).then(([rows, fields]) => { console.table(rows); });
    }

}

module.exports = DepartmentService;