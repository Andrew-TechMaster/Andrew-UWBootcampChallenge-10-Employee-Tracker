// Import and require mysql2
const mysql = require('mysql2');
require('dotenv').config();

const connectionString = {
    host: 'localhost',
    // MySQL username
    user: process.env.DB_USER,
    // MySQL user password
    password: process.env.DB_PASSWORD,
    // MySQL db name
    database: process.env.DB_NAME
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