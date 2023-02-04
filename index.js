const express = require('express');
const app = express();
const port = 3000;
const puppeteer = require('puppeteer');
const test = require('./Decks/standard.js');



app.get('/', (req, res) => {
    //res.send(typeof cardJson);
    res.send(cardJson);
})

app.listen(port, () => {
    console.log("Listening is port $1", [port]);
})

start();