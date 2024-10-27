import { MongoClient } from "mongodb";

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/`;

let client;
let dbInstance;
export let usersCollection;

export const connectToDb = async () => {
  if (!client) {
    client = new MongoClient(MONGO_URI, {
      connectTimeoutMS: 30000,
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB");

      dbInstance = client.db(process.env.DB_NAME);
      usersCollection = dbInstance.collection("users");
      console.log("Users collection ready.");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      throw error;
    }
  }

  return dbInstance;
};

const gracefulShutdown = async (signal) => {
  if (client) {
    console.log(`Received ${signal}. Closing MongoDB connection...`);
    try {
      await client.close();
      console.log("MongoDB connection closed.");
    } catch (error) {
      console.error("Error while closing MongoDB connection", error);
    }
    process.exit(0);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
