import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const connString = process.env.MONGO_URI;
const client = new MongoClient(connString);

let db;

// Using an immediately invoked async function to handle top-level await
try {
  const conn = await client.connect();
  db = conn.db("url_api");
  console.log("Connected to MongoDB");
} catch (e) {
  console.error("Error connecting to MongoDB:", e);
}

// Export as named export to match your import in url.js
export { db };