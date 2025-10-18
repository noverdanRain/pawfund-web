"server only";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;

if (!url) {
	throw new Error("Database URL is undefined");
}

const poolConnection = mysql.createPool({
	uri: url,
	connectionLimit: 10,
});

const db = drizzle({ client: poolConnection });

export default db;
