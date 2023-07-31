import jwt from "jsonwebtoken";
import db from "../Config/db.js";

const secretKey = "PROPACITYDMSDRIVE";

export const jwtAutFolder = async (req, res, next) => {
  const authToken = req.header("Authorization");

  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized: Token is not found!" });
  }

  try {
    const decodedToken = jwt.verify(authToken, secretKey);
    req.user = decodedToken;

    const userId = decodedToken.userId;
    const folderId = req.params.folderId;

    const folderQuery = `
      SELECT * FROM "folder_table" WHERE id = $1 AND user_id = $2;
    `;

    const folderResult = await db.query(folderQuery, [folderId, userId]);
    if (folderResult.rowCount === 0) {
      return res.status(403).json({
        error: "Forbidden: You do not have permission to access this folder.",
      });
    }

    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden: Invalid token." });
  }
};
