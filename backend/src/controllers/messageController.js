import Message from "../models/Message.js";
import { sendEmailToOwner } from "../config/email.js";

export async function createMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    const created = await Message.create({ name, email, subject, message });

    // Send email notifications
    try {
      await sendEmailToOwner({ name, email, subject, message });
    } catch (emailErr) {
      console.warn("Email sent failed, but message was saved:", emailErr.message);
    }

    res.status(201).json({ message: "Message sent successfully", id: created._id });
  } catch (err) {
    next(err);
  }
}

export async function getMessages(req, res, next) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}
