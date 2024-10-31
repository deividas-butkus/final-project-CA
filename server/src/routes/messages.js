import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

import { messagesCollection } from "../mongoClient.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// Route for getting all messages
router.get("/", authenticateToken, async (req, res) => {
  try {
    const messages = await messagesCollection.find().toArray();
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

export default router;
