import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

import { chatsCollection } from "../mongoClient.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// Route for getting all chats
router.get("/", authenticateToken, async (req, res) => {
  try {
    const chats = await chatsCollection.find().toArray();
    res.status(200).json(chats);
  } catch (err) {
    console.error("Error fetching chats:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

export default router;
