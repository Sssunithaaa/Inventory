import mysql from "mysql2/promise";

// Rest of your code...

import dotenv from "dotenv";
dotenv.config();
const connection = await mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

try {
  await connection.connect();
  console.log("Connected to MySQL!");
} catch (err) {
  console.error("Error connecting to MySQL:", err);
}

export default connection;
