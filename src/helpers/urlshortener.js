/**
 * Generates a random short URL identifier
 * 
 * Creates a random 10-character string using a combination of 
 * alphanumeric characters (both uppercase and lowercase letters, and numbers)
 * 
 * @returns {string} A randomly generated 10-character string to use as a short URL identifier
 */
function GetShortUrl() {
    // Initialize empty array to store characters
    let shortenedurl = [];
    
    // Define character set (uppercase, lowercase letters and numbers)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    // Generate 10 random characters
    for (let i = 0; i < 10; i++) {
        // Get random index within the character set
        let random = Math.floor(Math.random() * chars.length);
        
        // Add randomly selected character to our array
        shortenedurl.push(chars[random]);
    }
    
    // Join array elements into a single string and return
    return shortenedurl.join("");
}

/**
 * URL shortener utility module
 * Provides functions for generating and managing short URL identifiers
 * 
 * @module urlshortener
 */
export default {
    GetShortUrl
};