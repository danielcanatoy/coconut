import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root", // change if needed
  password: "admin", // change if needed
  database: "kokonut",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});
