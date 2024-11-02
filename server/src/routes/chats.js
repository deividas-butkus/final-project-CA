import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { chatsCollection, messagesCollection } from "../mongoClient.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// Route for getting chat summaries
router.get("/summary", authenticateToken, async (req, res) => {
  try {
    const chatSummaries = await chatsCollection
      .aggregate([
        { $match: { members: { $in: [req.user.userId] } } },
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
          $lookup: {
            from: "messages",
            let: { chatId: "$_id", userId: req.user.userId },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$chatId", "$$chatId"] },
                      { $eq: ["$receiverId", "$$userId"] },
                      { $eq: ["$isRead", false] },
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
            lastMessage: { $arrayElemAt: ["$lastMessage", 0] },
            unreadCount: { $size: "$unreadMessages" },
          },
        },
        {
          $project: {
            _id: 1,
            members: 1,
            memberDetails: { _id: 1, username: 1, profileImage: 1 },
            lastMessage: { _id: 1, content: 1, isRead: 1, createdAt: 1 },
            unreadCount: 1,
          },
        },
      ])
      .toArray();

    res.status(200).json(chatSummaries);
  } catch (err) {
    console.error("Error fetching chat summaries:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

// Route for getting a specific chat by ID
router.get("/chat/:id", authenticateToken, async (req, res) => {
  const chatId = req.params.id;

  try {
    const chat = await chatsCollection
      .aggregate([
        { $match: { _id: chatId, members: { $in: [req.user.userId] } } },
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
              {
                $project: {
                  _id: 1,
                  content: 1,
                  isRead: 1,
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
      return res.status(404).json({ error: "Chat not found" });
    }

    res.status(200).json(chat[0]);
  } catch (err) {
    console.error("Error fetching chat by ID:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

export default router;
