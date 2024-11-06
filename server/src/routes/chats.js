import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { chatsCollection, messagesCollection } from "../mongoClient.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// Route for getting chat summaries
router.get("/summary", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const chatSummaries = await chatsCollection
      .aggregate([
        { $match: { members: { $in: [userId] } } },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "memberDetails",
          },
        },
        {
          $lookup: {
            from: "messages",
            let: { chatId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$chatId", "$$chatId"] } } },
              { $sort: { createdAt: -1 } },
              { $limit: 1 },
            ],
            as: "lastMessage",
          },
        },
        {
          $addFields: {
            lastMessage: { $arrayElemAt: ["$lastMessage", 0] },
          },
        },
        {
          $lookup: {
            from: "messages",
            let: { chatId: "$_id", lastSeen: `$lastSeen.${userId}` },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$chatId", "$$chatId"] },
                      { $gt: ["$createdAt", "$$lastSeen"] },
                      { $ne: ["$userId", userId] },
                    ],
                  },
                },
              },
            ],
            as: "unreadMessages",
          },
        },
        {
          $addFields: {
            unreadCount: { $size: "$unreadMessages" },
          },
        },
        {
          $project: {
            _id: 1,
            members: 1,
            memberDetails: { _id: 1, username: 1, profileImage: 1 },
            lastMessage: { _id: 1, content: 1, createdAt: 1 },
            lastSeen: 1,
            unreadCount: 1,
          },
        },
      ])
      .toArray();

    console.log(chatSummaries);

    res.status(200).json(chatSummaries);
  } catch (err) {
    console.error("Error fetching chat summaries:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

// Route for getting a specific chat by ID with all messages
router.get("/chat/:id", authenticateToken, async (req, res) => {
  const chatId = req.params.id;
  const userId = req.user.userId;

  try {
    const chat = await chatsCollection
      .aggregate([
        { $match: { _id: chatId, members: { $in: [userId] } } },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "memberDetails",
          },
        },
        {
          $lookup: {
            from: "messages",
            let: { chatId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$chatId", "$$chatId"] } } },
              { $sort: { createdAt: 1 } }, // Sort messages in ascending order
              {
                $project: {
                  _id: 1,
                  content: 1,
                  userId: 1,
                  createdAt: 1,
                },
              },
            ],
            as: "messages",
          },
        },
        {
          $project: {
            _id: 1,
            members: 1,
            memberDetails: { _id: 1, username: 1, profileImage: 1 },
            messages: 1,
          },
        },
      ])
      .toArray();

    if (chat.length === 0) {
      return res
        .status(404)
        .json({ error: "Chat not found or you don't have access to it." });
    }

    res.status(200).json(chat[0]);
  } catch (err) {
    console.error("Error fetching chat by ID:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

// Route for adding a chat or returning an existing one
router.post("/chat/add", authenticateToken, async (req, res) => {
  const { members } = req.body;

  if (!Array.isArray(members) || members.length < 1) {
    return res.status(400).json({
      error: "At least one valid member ID is required to create a chat.",
    });
  }

  try {
    const existingChat = await chatsCollection.findOne({
      members: { $all: members, $size: members.length },
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const chat = {
      _id: uuidv4(),
      members,
    };

    await chatsCollection.insertOne(chat);
    res.status(201).json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Failed to create chat" });
  }
});

// Route for deletting a chat
router.delete("/chat/delete/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await chatsCollection.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: "Failed to delete chat" });
  }
});

// Route to update chat's lastSeen timestamp
router.patch("/chat/:chatId/lastSeen", authenticateToken, async (req, res) => {
  const { chatId } = req.params;
  const userId = req.user.userId;

  if (!userId) {
    return res.status(400).json({ error: "User not authenticated." });
  }

  try {
    const timestamp = new Date().toISOString();

    const result = await chatsCollection.updateOne(
      { _id: chatId },
      { $set: { [`lastSeen.${userId}`]: timestamp } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Chat not found." });
    }

    console.log(`Last seen updated for userId: ${userId} in chatId: ${chatId}`);

    res
      .status(200)
      .json({ message: "Last seen timestamp updated successfully." });
  } catch (error) {
    console.error("Error updating last seen timestamp:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating last seen timestamp." });
  }
});

// Route for unred messages count.
router.get("/chat/:chatId/unreadCount", async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required." });
  }

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    const lastSeen = chat.lastSeen[userId];
    if (!lastSeen) {
      return res
        .status(404)
        .json({ error: "Last seen timestamp not found for this user." });
    }

    const unreadCount = await Message.countDocuments({
      chatId,
      createdAt: { $gt: lastSeen },
    });

    res.status(200).json({ unreadCount });
  } catch (error) {
    console.error("Error fetching unread messages count:", error);
    res.status(500).json({
      error: "An error occurred while fetching unread messages count.",
    });
  }
});

export default router;
