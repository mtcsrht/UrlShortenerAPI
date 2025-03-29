import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRouter from './src/routes/url.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Routes
app.use('/url', urlRouter);

app.get('/', (req, res) => {
    res.send("API is alive");
});

// Server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});