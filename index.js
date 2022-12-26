const express = require('express');
const app = express();
const port = 3000;
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const { arrayBuffer } = require('stream/consumers');

let cardJson = new Object();
async function start(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.mtgtop8.com/event?e=40289&d=499906&f=ST");
    //await page.screenshot({path: "standardmtg.png", fullPage: true});

    const cards = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.deck_line')).map(x => x.textContent);
    });

    cardJson.cards = cards;

    await browser.close();
}

app.get('/', (req, res) => {
    //res.send(typeof cardJson);
    res.send(cardJson);
})

app.listen(port, () => {
    console.log("Listening is port $1", [port]);
})

start();