/**
 * MongoDB database connection module
 * Establishes and manages the connection to the MongoDB database
 * 
 * @module mongo
 */

import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * MongoDB connection string retrieved from environment variables
 * Should be defined in .env file as MONGO_URI
 * Format: mongodb://[username:password@]host[:port]/database
 */
const connString = process.env.MONGO_URI;

/**
 * MongoDB client instance for connecting to the database
 */
const client = new MongoClient(connString);

/**
 * Database instance that will be populated once connected
 * @type {import('mongodb').Db}
 */
let db;

// Using an immediately invoked async function to handle top-level await
try {
  // Establish connection to MongoDB server
  const conn = await client.connect();
  
  // Access the url_api database
  db = conn.db("url_api");
  
  console.log("Connected to MongoDB");
} catch (e) {
  // Log detailed error information if connection fails
  console.error("Error connecting to MongoDB:", e);
}

/**
 * Export the database instance for use in other modules
 * This allows other parts of the application to query and manipulate
 * the database without having to establish their own connections
 */
export { db };