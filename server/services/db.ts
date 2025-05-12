import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
});

db.connect(() => {
  console.log(`🛢️  MySQL connected at ${db.config.database}`);
});
