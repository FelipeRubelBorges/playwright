const { Pool } = require("pg");

const dbConfig = {
    host: "localhost",
    port: 5432,
    user: "postgres", 
    password: "pwd123",
    database: "zombieplus"
};

const pool = new Pool(dbConfig);

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