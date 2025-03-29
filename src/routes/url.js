import express from 'express';
import bodyParser from 'body-parser';
import url from '../helpers/urlshortener.js';
import { db } from '../db/mongo.js';

const router = express.Router();

router.use(bodyParser.json());
router.get('/:short_url', async (req, res) =>{
    const short_url = req.params.short_url //which is the random url generated
    
    let coll = db.collection("urls");
    let query = {
        short_url: short_url
    };
    let result = await coll.findOne(query);

    if(!result) res.send("Not found!").status(404);
    
    res.send({
        url: result.original_url
    })
})

// Creates an object in the database, the id is the short url, original_url is the original url provided
router.post("/", async (req, res) =>{
    const short_url = url.GetShortUrl()
    const originalUrl = req.body.url
    let coll = await db.collection("urls");
    
    let newDocument = {
        short_url: short_url,
        original_url: req.body.url
    }
    
    let result = await coll.insertOne(newDocument)
    res.send({
        short_url: short_url
    }).status(204);
})

router.delete('/:id', (req, res) =>{

})

export default router;