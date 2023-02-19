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
const pauper = require('./Decks/pauper.js');
const duelCommander = require('./Decks/duel-commander.js')

//Making all of the routes

app.get('/', (req, res) => {
    
    res.send('Select a MTG format to get data');
})

//Standard api routes
app.get('/standard', (req, res) => {
    async function launch(){
        const deck = await standard.start();
        res.send(deck);
    }
    launch();
})

//Modern api routes
app.get('/modern', (req, res) => {
    async function launch(){
        const deck = await modern.start();
        res.send(deck);
    }
    launch();
})

//Vintage api routes
app.get('/vintage', (req, res) => {
    async function launch(){
        const deck = await vintage.start();
        res.send(deck);
    }
    launch();
})

//Legacy api routes
app.get('/legacy', (req, res) => {
    async function launch(){
        const deck = await legacy.start();
        res.send(deck);
    }
    launch();
})

//Pioneer api routes
app.get('/pioneer', (req, res) => {
    async function launch(){
        const deck = await pioneer.start();
        res.send(deck);
    }
    launch();
})

//Historic api routes
app.get('/historic', (req, res) => {
    async function launch(){
        const deck = await historic.start();
        res.send(deck);
    }
    launch();
})

//Explorer api routes
app.get('/explorer', (req, res) => {
    async function launch(){
        const deck = await explorer.start();
        res.send(deck);
    }
    launch();
})

//Pauper api routes
app.get('/pauper', (req, res) => {
    async function launch(){
        const deck = await pauper.start();
        res.send(deck);
    }
    launch();
})

//Duel Commander api routes
app.get('/duel-commander', (req, res) => {
    async function launch(){
        const deck = await duelCommander.start();
        res.send(deck);
    }
    launch();
})

app.listen(port, () => {
    console.log("Listening is port $1", [port]);
})
