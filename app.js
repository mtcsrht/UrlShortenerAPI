const express = require('express');
const bodyParser = require('bodyParser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Routes
app.route("v1")
app.get('/', (req, res) => {
    res.send("API is alive!")
});


// Server

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})