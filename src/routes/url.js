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
    try {
        const short_url = req.params.short_url; // Get shortened URL identifier from route parameter
        
        let coll = db.collection("urls");
        let query = {
            short_url: short_url
        };
        
        // Query the database for the corresponding original URL
        let result = await coll.findOne(query);

        // Return 404 if no match found
        if(!result) {
            return res.status(404).send({
                message: "URL not found"
            });
        }
        
        // Return the original URL in JSON format
        return res.status(200).send({
            url: result.original_url
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Error retrieving URL:", error);
        
        // Send appropriate error response
        return res.status(500).send({
            message: "Failed to retrieve URL",
            error: error.message
        });
    }
});

/**
 * Create a new shortened URL for a provided original URL
 * 
 * @route POST /url
 * @param {string} req.body.url - The original URL to shorten
 * @returns {Object} JSON object containing the generated short URL identifier
 */
router.post("/", async (req, res) => {
    try {
        // Check if URL was provided
        if (!req.body.url) {
            return res.status(400).send({
                message: "URL is required"
            });
        }
        
        // Generate a random short URL identifier
        const short_url = url.GetShortUrl();
        const originalUrl = req.body.url;
        
        // Reference to URLs collection in database
        let coll = await db.collection("urls");
        
        // Create document for database insertion
        let newDocument = {
            short_url: short_url,
            original_url: req.body.url,
            created_at: new Date()
        };
        
        // Store the URL mapping in the database
        let result = await coll.insertOne(newDocument);
        
        // Return the generated short URL identifier
        return res.status(201).send({
            short_url: short_url
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Error creating shortened URL:", error);
        
        // Send appropriate error response
        return res.status(500).send({
            message: "Failed to create shortened URL",
            error: error.message
        });
    }
});

/**
 * Delete a shortened URL from the database
 * 
 * @route DELETE /url/:id
 * @param {string} req.params.id - The shortened URL identifier to delete
 * @returns {Object} Status indicating success or failure
 */
router.delete('/:id', async (req, res) => {
    try {
        // Get collection reference
        let coll = await db.collection("urls");
        
        // Build query to find the URL by short_url
        let query = {
            short_url: req.params.id
        };
        
        // Check if URL exists
        let result = await coll.findOne(query);
        if (!result) {
            // Return 404 if not found
            return res.status(404).send({ message: "URL not found" });
        }
        
        // Delete the document
        let delResult = await coll.deleteOne(query);
        
        // Check if deletion was successful
        if (delResult.deletedCount === 1) {
            return res.status(200).send({ message: "URL deleted successfully" });
        } else {
            return res.status(500).send({ message: "Failed to delete URL" });
        }
    } catch (error) {
        console.error("Error in delete endpoint:", error);
        return res.status(500).send({ message: "Server error" });
    }
});

export default router;