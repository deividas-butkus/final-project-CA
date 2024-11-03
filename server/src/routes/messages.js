import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

import { messagesCollection } from "../mongoClient.js";
import { chatsCollection } from "../mongoClient.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// POST route to add a message to a chat
router.post("/add", authenticateToken, async (req, res) => {
  const { chatId, content, userId } = req.body;
  const senderId = userId || req.user.userId;

  if (!chatId || !content || !senderId) {
    return res
      .status(400)
      .json({ error: "chatId, content, and userId are required." });
  }

  const newMessage = {
    _id: uuidv4(),
    chatId,
    userId: senderId,
    content,
    createdAt: new Date(),
    isRead: false,
  };

  try {
    await messagesCollection.insertOne(newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Failed to add message" });
  }
});

export default router;
