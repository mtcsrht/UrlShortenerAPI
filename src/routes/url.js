import express from 'express';
import bodyParser from 'body-parser';
import url from '../helpers/urlshortener.js';
import { db } from '../db/mongo.js';

/**
 * Express router to handle URL shortening operations
 * Provides endpoints for creating, retrieving, and deleting shortened URLs
 */
const router = express.Router();

// Parse JSON request bodies
router.use(bodyParser.json());

/**
 * Retrieve the original URL associated with a shortened URL
 * 
 * @route GET /url/:short_url
 * @param {string} req.params.short_url - The shortened URL identifier to look up
 * @returns {Object} JSON object containing the original URL or a not found message
 */
router.get('/:short_url', async (req, res) => {
    const short_url = req.params.short_url; // Get shortened URL identifier from route parameter
    
    let coll = db.collection("urls");
    let query = {
        short_url: short_url
    };
    
    // Query the database for the corresponding original URL
    let result = await coll.findOne(query);

    // Return 404 if no match found
    if(!result) return res.status(404).send("Not found!");
    
    // Return the original URL in JSON format
    res.send({
        url: result.original_url
    });
});

/**
 * Create a new shortened URL for a provided original URL
 * 
 * @route POST /url
 * @param {string} req.body.url - The original URL to shorten
 * @returns {Object} JSON object containing the generated short URL identifier
 */
router.post("/", async (req, res) => {
    // Generate a random short URL identifier
    const short_url = url.GetShortUrl();
    const originalUrl = req.body.url;
    
    // Reference to URLs collection in database
    let coll = await db.collection("urls");
    
    // Create document for database insertion
    let newDocument = {
        short_url: short_url,
        original_url: req.body.url
    };
    
    // Store the URL mapping in the database
    let result = await coll.insertOne(newDocument);
    
    // Return the generated short URL identifier
    // Note: status should be set before send, not after
    return res.status(201).send({
        short_url: short_url
    });
});

/**
 * Delete a shortened URL from the database
 * 
 * @route DELETE /url/:id
 * @param {string} req.params.id - The shortened URL identifier to delete
 * @returns {Object} Status indicating success or failure
 */
router.delete('/:id', async (req, res) => {
    // Not implemented yet - placeholder for future functionality
    // Should delete the URL mapping from the database
});

export default router;