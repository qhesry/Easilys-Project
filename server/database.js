import pgp from "pg-promise";
import * as fs from "fs";
import * as path from "path";
const __dirname = path.resolve();

var dbConnection;

export function initDB() {
    const database = pgp();

    let rawdata = fs.readFileSync(path.join(__dirname, '/server/database.config.json'));
    let databaseConfig = JSON.parse(rawdata);

    const dbConfig = {
        host: databaseConfig.host,
        port: databaseConfig.port,
        database: databaseConfig.databaseName,
        user: databaseConfig.userDatabase,
        password: databaseConfig.passwordDatabase,
        max: databaseConfig.maxConnection,
    };

    dbConnection = database(dbConfig);
    return dbConnection;
}