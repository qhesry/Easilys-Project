const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'BabyfootManager',
    user: 'postgres',
    password: 'postgres',
    max: 30
};

import pgp from "pg-promise";

var dbConnection;

export function initDB(){
    const database = pgp();
    dbConnection = database(dbConfig);
    return dbConnection;
}   