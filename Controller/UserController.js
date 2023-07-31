import db from "../Config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

const secretKey = "PROPACITYDMSDRIVE";

export const createUser = async (req, res) => {
  User();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const emailValidator = `
       select * from user_table where email = $1; 
    `;

    const emailExists = await db.query(emailValidator, [email]);

    if (emailExists > 0) {
      return res.status(400).json({ error: "Email is already exists!" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUserQuery = `
        INSERT INTO "user_table" (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;

    const values = [username, email, hashedPassword];
    const result = await db.query(createUserQuery, values);

    const user = result.rows[0];

    const authToken = jwt.sign({ userId: user.id }, secretKey);
    res.json({
      message: "User registered successfully.",
      user: user,
      authToken: authToken,
    });
  } catch (error) {
    console.error("Error in registering user:", error);
    res.status(500).json({ error: "User is not created!" });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const emailValidator = `
        select * from user_table where email = $1; 
     `;

    const result = await db.query(emailValidator, [email]);

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "user not found." });
    }

    const user = result.rows[0];

    const passwordMatching = await bcrypt.compare(password, user.password);

    if (!passwordMatching) {
      return res.status(401).json({ error: "Incorrect password!" });
    }

    const authToken = jwt.sign({ userId: user.id }, secretKey);
    res.json({
        message: "user logging successfully!!",
        user: user,
        authToken: authToken,
      });
  } catch (error) {
    console.error("Error in logging the user:", error);
    res.status(500).json({ error: "Error in user logging!!" });
  }
};
