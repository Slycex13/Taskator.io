import mysql from "mysql2";

export const db = mysql.createConnection({
  user: "root",
  password: "",
  database: "Taskator",
  host: "localhost",
});

db.connect(() => {
  console.log(`🛢️  MySQL connected at ${db.config.database}`);
});
