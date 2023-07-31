import express from "express";
import { createUser, loginUser } from "../Controller/UserController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/createUser",
  [
    body("username").not().isEmpty().withMessage("Enter username."),
    body("email").isEmail().withMessage("Enter a valid email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  createUser
);

router.post(
  "/loginUser",
  [
    body("email").isEmail().withMessage("Enter a valid email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  loginUser
);

export default router;
