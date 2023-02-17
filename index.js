const express = require('express');
const app = express();
const port = 3000;
const standard = require('./Decks/standard.js');
const modern = require('./Decks/modern.js');
const vintage = require('./Decks/vintage.js');
const legacy = require('./Decks/legacy.js');
const pioneer = require('./Decks/pioneer.js');
const historic = require('./Decks/historic.js');
const explorer = require('./Decks/explorer.js');
const pauper = require('./Decks/pauper.js')

//Making all of the routes

app.get('/', (req, res) => {
    
    res.send('Select a MTG format to get data');
})


app.get('/standard', (req, res) => {
    async function launch(){
        const deck = await standard.start();
        res.send(deck);
    }
    launch();
})

app.get('/modern', (req, res) => {
    async function launch(){
        const deck = await modern.start();
        res.send(deck);
    }
    launch();
})

app.get('/vintage', (req, res) => {
    async function launch(){
        const deck = await vintage.start();
        res.send(deck);
    }
    launch();
})


app.get('/legacy', (req, res) => {
    async function launch(){
        const deck = await legacy.start();
        res.send(deck);
    }
    launch();
})

app.get('/pioneer', (req, res) => {
    async function launch(){
        const deck = await pioneer.start();
        res.send(deck);
    }
    launch();
})

app.get('/historic', (req, res) => {
    async function launch(){
        const deck = await historic.start();
        res.send(deck);
    }
    launch();
})

app.get('/explorer', (req, res) => {
    async function launch(){
        const deck = await explorer.start();
        res.send(deck);
    }
    launch();
})

app.get('/pauper', (req, res) => {
    async function launch(){
        const deck = await pauper.start();
        res.send(deck);
    }
    launch();
})

app.listen(port, () => {
    console.log("Listening is port $1", [port]);
})
