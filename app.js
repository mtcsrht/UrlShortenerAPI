/**
 * URL Shortener API - Main Application Entry Point
 * 
 * This Express application provides a URL shortening service through a RESTful API.
 * It handles URL shortening, retrieval, and management operations.
 * 
 * @module app
 */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRouter from './src/routes/url.js';

// Load environment variables from .env file
dotenv.config();

/**
 * Express application instance
 * @type {import('express').Application}
 */
const app = express();

/**
 * Server port - uses PORT from environment variables or defaults to 3000
 * @type {number}
 */
const PORT = process.env.PORT || 3000;

// Middleware Configuration
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({extended: true})); // Parse URL-encoded request bodies

// Route Configuration
app.use('/url', urlRouter); // Mount URL routing module at /url path

/**
 * Health check endpoint
 * Provides a simple way to verify the API is running
 * 
 * @route GET /
 * @returns {string} Simple message indicating API is operational
 */
app.get('/', (req, res) => {
    res.send("API is alive");
});

// Start the HTTP server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});