import db from "../Config/db.js";

const queryForFolderTable = `
  CREATE TABLE IF NOT EXISTS "folder_table" (
    id SERIAL PRIMARY KEY,
    folder_name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES "user_table"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const Folder = async () => {
    try {
        await db.query(queryForFolderTable);
        console.log("Folder Table created Successfully!");
    } catch (error) {
        console.log("Error in Folder Table creation : ", error);
    }
}

export default Folder;
