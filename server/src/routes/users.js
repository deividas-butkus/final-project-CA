import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import { usersCollection } from "../mongoClient.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "..", "uploads", "profileImages");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the defined uploadDir
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route for getting all users
router.get("/", async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

// Route for posting user
router.post("/", upload.single("profileImage"), async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      _id: uuidv4(),
      username,
      password: hashedPassword,
      profileImage: req.file ? req.file.path : "/default/path/to/image.jpg",
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

export default router;
