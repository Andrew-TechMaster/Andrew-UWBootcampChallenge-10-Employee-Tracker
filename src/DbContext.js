class DbContext {
    constructor(dbconnect) {
        // Import and require mysql2
        const mysql = require('mysql2');

        // Connect to database
        const db = mysql.createConnection(
            {
                host: 'localhost',
                // MySQL username
                user: 'root',
                // MySQL password
                password: 'mac@sql201',
                database: 'grocery_db'
                // database: 'company_db'
            },
            console.log(`Connected to the company_db database.`)
        );

        this.dbconnect = db;
    }

    /**
    *  Function to query database
    *  @param {string} sqlQuery Sql syntax such as 'SELECT * FROM employee'
    */
    useQuery(sqlQuery) {
        this.dbconnect.query(sqlQuery, function (err, results) {
            console.log(results);
        });
    }

}


module.exports = DbContext;