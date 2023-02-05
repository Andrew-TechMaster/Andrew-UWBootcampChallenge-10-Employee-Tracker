// Import and require mysql2
const mysql = require('mysql2');
const connectionString = {
    host: 'localhost',
    // MySQL username
    user: 'root',
    // MySQL password
    password: 'mac@sql201',
    // database: 'grocery_db'
    database: 'company_db'
}

class DbContext {
    // #privateField
    #dbConnect;

    constructor() {
        // Connect to database
        // const db = mysql.createConnection(connectionString, console.log(`Connected to the ${connectionString.database}.`));
        const dbAsync = mysql.createPool(connectionString).promise();

        this.#dbConnect = dbAsync;
    }

    /**
    *  Function to query database (Async)
    *  @param {string} sqlQuery Sql syntax such as 'SELECT * FROM employee'
    **/
    async useQueryAsync(sqlQuery) {
        // await this.#dbConnect.query(sqlQuery)
        //     .then(([rows, fields]) => { console.table(rows); });

        var res = await this.#dbConnect.query(sqlQuery);
        return res;
        // var log = temp.then(([rows, fields]) => { console.table(rows); });
        // return log;
    }

    /**
    *  Function to query database
    *  @param {string} sqlQuery Sql syntax such as 'SELECT * FROM employee'
    **/
    useQuery(sqlQuery) {
        this.#dbConnect.query(sqlQuery, (err, results) => console.table(results));
    }

}


module.exports = DbContext;