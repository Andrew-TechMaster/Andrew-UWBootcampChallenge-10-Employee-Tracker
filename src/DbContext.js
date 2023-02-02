// Import and require mysql2
const mysql = require('mysql2');
const connectionString = {
    host: 'localhost',
    // MySQL username
    user: 'root',
    // MySQL password
    password: 'mac@sql201',
    database: 'grocery_db'
    // database: 'company_db'
}

class DbContext {
    // #privateField
    #dbConnect;

    constructor() {
        // Connect to database
        const db = mysql.createConnection(connectionString, console.log(`Connected to the database.`));
        this.#dbConnect = db;
    }

    /**
    *  Function to query database
    *  @param {string} sqlQuery Sql syntax such as 'SELECT * FROM employee'
    */
    useQuery(sqlQuery) {
        this.#dbConnect.query(sqlQuery, function (err, results) {
            console.log(results);
        });
    }

}


module.exports = DbContext;