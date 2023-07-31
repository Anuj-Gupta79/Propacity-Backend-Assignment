import db from "../Config/db.js";

const queryForUserTable = `
   CREATE TABLE IF NOT EXIStS "user_table"(
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
   );
`;

const User = async () => {
  try {
    await db.query(queryForUserTable);
    console.log("User Table created successfully!");
  } catch (error) {
    console.log(error);
  }
};

export default User;
