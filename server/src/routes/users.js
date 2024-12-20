import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";

import { usersCollection } from "../mongoClient.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "uploads", "profileImages");
const defaultImagePath = "/uploads/defaultProfileImage.png";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const JWT_SECRET = process.env.JWT_SECRET;

// Route for logging in
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get currently logged in user
router.get("/current", authenticateToken, async (req, res) => {
  try {
    const user = await usersCollection.findOne({ _id: req.user.userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// Route to get all users
router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await usersCollection.find().sort({ username: 1 }).toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

// Route to get a user by ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersCollection.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    delete user.password;
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for posting user
router.post("/", upload.single("profileImage"), async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already occupied" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      _id: uuidv4(),
      username,
      password: hashedPassword,
      profileImage: req.file
        ? `/uploads/profileImages/${req.file.filename}`
        : defaultImagePath,
    };

    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// Route to check whether username is already occupied
router.get("/checkUsername", async (req, res) => {
  console.log("Checking username availabitity");
  console.log(req.query);
  const { username } = req.query;

  try {
    const existingUser = await usersCollection.findOne({ username });
    res.status(200).json({ exists: !!existingUser });
    console.log({ exists: !!existingUser });
  } catch (err) {
    console.error("Error checking username:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update username
router.patch("/updateUsername", authenticateToken, async (req, res) => {
  const { username } = req.body;
  const userId = req.user.userId;

  try {
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser && existingUser._id !== userId) {
      return res.status(400).json({ message: "Username already occupied" });
    }

    await usersCollection.updateOne({ _id: userId }, { $set: { username } });

    const updatedUser = await usersCollection.findOne({ _id: userId });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Failed to update username:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update profile image
router.patch(
  "/updateProfileImage",
  authenticateToken,
  upload.single("profileImage"),
  async (req, res) => {
    const userId = req.user.userId;

    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const user = await usersCollection.findOne({ _id: userId });
      if (!user) {
        console.error("User not found for update:", userId);
        return res.status(404).json({ message: "User not found" });
      }

      const oldProfileImage = user.profileImage;
      const newProfileImage = `/uploads/profileImages/${req.file.filename}`;

      const result = await usersCollection.updateOne(
        { _id: userId },
        { $set: { profileImage: newProfileImage } }
      );

      if (result.matchedCount === 0) {
        console.error("Failed to update profile image in database");
        return res
          .status(500)
          .json({ message: "Failed to update profile image in database" });
      }

      if (oldProfileImage && oldProfileImage !== defaultImagePath) {
        const oldImagePath = path.join(__dirname, "..", oldProfileImage);

        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Failed to delete old profile image:", err);
            } else {
              console.log("Old profile image deleted successfully");
            }
          });
        } else {
          console.log("Old profile image not found, no deletion necessary");
        }
      }

      const updatedUser = await usersCollection.findOne({ _id: userId });
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error("Failed to update profile image:", err);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  }
);

// Route to reset profile image to the default
router.patch("/resetProfileImage", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await usersCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const oldProfileImage = user.profileImage;

    await usersCollection.updateOne(
      { _id: userId },
      { $set: { profileImage: defaultImagePath } }
    );

    if (oldProfileImage && oldProfileImage !== defaultImagePath) {
      const oldImagePath = path.join(__dirname, "..", oldProfileImage);

      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Failed to delete old profile image:", err);
          } else {
            console.log("Old profile image deleted successfully");
          }
        });
      }
    }

    res.status(200).json({ message: "Profile image reset to default" });
  } catch (err) {
    console.error("Failed to reset profile image:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// Route to validate old password
router.post("/validatePassword", authenticateToken, async (req, res) => {
  const { password } = req.body;
  const userId = req.user.userId;

  try {
    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    res.status(200).json({ message: "Old password is valid" });
  } catch (err) {
    console.error("Error validating password:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update password
router.patch("/updatePassword", authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await usersCollection.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Failed to update password:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
