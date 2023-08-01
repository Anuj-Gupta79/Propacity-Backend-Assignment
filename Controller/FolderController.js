import db from "../Config/db.js";
import Folder from "../models/Folder.js";

export const createFolder = async (req, res) => {
  Folder();
  const userId = req.user.userId;

  const { folderName } = req.body;

  if (!folderName || typeof folderName !== "string") {
    return res.status(400).json({ error: "Invalid folder name." });
  }

  try {
    const checkFolderQuery = `
      SELECT * FROM "Folder" WHERE user_id = $1 AND name = $2;
    `;

    const folderExists = await db.query(checkFolderQuery, [userId, folderName]);
    if (folderExists.rowCount > 0) {
      return res
        .status(400)
        .json({ error: "Folder name already exists for the current user." });
    }

    const insertQuery = `
      INSERT INTO "folder_table" (folder_name, user_id)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const values = [folderName, userId];
    const result = await db.query(insertQuery, values);

    res.json({
      message: "Folder created successfully.",
      folder: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating folder:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the folder." });
  }
};