import db from "../Config/db.js";

const queryForSubFolderTable = `
CREATE TABLE IF NOT EXISTS "sub_folder_table" (
    id SERIAL PRIMARY KEY,
    folder_name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES "user_table"(id) ON DELETE CASCADE,
    parent_id INTEGER NOT NULL REFERENCES "folder_table"(id) ON DELETE CASCADE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const subFolder = async () =>{
    try {
        await db.query(queryForSubFolderTable);
        console.log("subFolder table created successfully!!");
    } catch (error) {
        console.log(error);
    }
}

export default subFolder;