import db from "../Config/db.js";
import subFolder from "../models/SubFolder.js";

export const createSubFolder = async (req, res) => {
  subFolder();
  const userId = req.user.userId;
  const parentId = req.params.parentId;
  const { subFolderName } = req.body;

  if (!subFolderName || typeof subFolderName !== "string") {
    return res.status(400).json({ error: "Invalid subfolder name." });
  }

  try {
    const parentFolderQuery = `
    SELECT * FROM "folder_table" WHERE id = $1 AND user_id = $2;
  `;

    const parentFolderResult = await db.query(parentFolderQuery, [
      parentId,
      userId,
    ]);
    if (parentFolderResult.rowCount === 0) {
      return res.status(404).json({
        error: "Parent folder not found!",
      });
    }

    const checkSubfolderQuery = `
    SELECT * FROM "sub_folder_table" WHERE user_id = $1 AND parent_id = $2 AND name = $3;
  `;

    const subfolderExists = await db.query(checkSubfolderQuery, [
      userId,
      parentId,
      subFolderName,
    ]);

    if (subfolderExists.rowCount > 0) {
      return res.status(400).json({
        error:
          "Subfolder name already exists for the current user within the parent folder.",
      });
    }

    const insertQuery = `
    INSERT INTO "sub_folder_table" (name, user_id, parent_folder_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

    const values = [subFolderName, userId, parentId];
    const result = await db.query(insertQuery, values);

    res.json({
      message: "Subfolder created successfully!!",
      subfolder: result.rows[0],
    });
  } catch (error) {
    console.error("Error in creating subfolder:", error);
    res.status(500).json({ error: "Subfolder has not created!!" });
  }
};
