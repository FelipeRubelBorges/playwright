const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

export async function executeSql(sqlScript) {
    try {
        const pool = new Pool(dbConfig);
        const client = await pool.connect();
        const result = await client.query(sqlScript);
        console.log(result.rowCount + "rows deleted");
    } catch (error) {
        console.error("Error executing SQL script:" + error);
    }
}

module.exports = { executeSql };
