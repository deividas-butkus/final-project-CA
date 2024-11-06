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
    createdAt: new Date().toISOString(),
  };

  try {
    await messagesCollection.insertOne(newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Failed to add message" });
  }
});

// Route for setting liked message
router.patch(
  "/message/toggle-like/:messageId",
  authenticateToken,
  async (req, res) => {
    const { messageId } = req.params;
    const userId = req.user.userId;

    try {
      const message = await messagesCollection.findOne({ _id: messageId });

      if (!message) {
        return res.status(404).json({ error: "Message not found." });
      }

      if (message.userId === userId) {
        return res
          .status(403)
          .json({ error: "Cannot like/unlike your own message." });
      }

      const updatedMessage = await messagesCollection.updateOne(
        { _id: messageId },
        {
          $set: { likedUserId: message.likedUserId === userId ? null : userId },
        }
      );

      res.status(200).json({
        message:
          message.likedUserId === userId
            ? "Message unliked successfully."
            : "Message liked successfully.",
      });
    } catch (error) {
      console.error("Error toggling like:", error);
      res
        .status(500)
        .json({ error: "An error occurred while toggling the like." });
    }
  }
);

export default router;
