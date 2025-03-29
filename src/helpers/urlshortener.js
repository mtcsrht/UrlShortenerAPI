function GetShortUrl(){
    let shortenedurl = [];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 10; i++) {
        let random = Math.floor(Math.random() * chars.length)
        shortenedurl.push(chars[random]);
    }
    return shortenedurl.join("");
}

// Export as default object with methods
export default {
    GetShortUrl
};