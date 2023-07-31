import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const db = new Pool({
  host : process.env.DB_HOST,
  port : process.env.DB_PORT,
  name : process.env.DB_NAME,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD
});

db.connect((err, client, done) => {
  if (err) {
    console.log("Database can not connect with server :- ", err);
  } else {
    console.log("Database connected successfully!!");
  }
  done();
});

export default db;
