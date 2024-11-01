import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

import { chatsCollection } from "../mongoClient.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// Route for getting all chats
router.get("/", authenticateToken, async (req, res) => {
  try {
    const chats = await chatsCollection
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
          $addFields: {
            lastMessage: { $arrayElemAt: ["$lastMessage", 0] },
            unreadCount: {
              $size: {
                $filter: {
                  input: "$lastMessage",
                  as: "msg",
                  cond: { $eq: ["$$msg.isRead", false] },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            members: 1,
            memberDetails: { _id: 1, username: 1, profileImage: 1 },
            lastMessage: { content: 1, isRead: 1, createdAt: 1 },
            unreadCount: 1,
          },
        },
      ])
      .toArray();

    res.status(200).json(chats);
  } catch (err) {
    console.error("Error fetching chats:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

export default router;
