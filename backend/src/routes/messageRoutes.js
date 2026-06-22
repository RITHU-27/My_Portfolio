import { Router } from "express";
import { body, validationResult } from "express-validator";
import { createMessage, getMessages } from "../controllers/messageController.js";

const router = Router();

const validateMessage = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("A valid email is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

router.route("/").get(getMessages).post(validateMessage, createMessage);

export default router;
