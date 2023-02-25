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
const duelCommander = require('./Decks/duel-commander.js');
const cedh = require('./Decks/cedh.js');
const alchemy = require('./Decks/alchemy.js');
const peasant = require('./Decks/peasant.js');
const block = require('./Decks/block.js');
const extended = require('./Decks/extended.js');
const highlander = require('./Decks/highlander.js');
const canadian_highlander = require('./Decks/canadianHighlander.js');


//Making all of the routes

app.get('/', (req, res) => {
    res.send('Select a MTG format to get data');
})

//Standard api routes
app.get('/standard', (req, res) => {
    async function launch(){
        const deck = await standard.standardLast2Months();
        res.send(deck);
    }
    launch();
})

app.get('/standard/:standardFormatId', (req, res) => {
    async function launch(){
        const standardFunction = req.params.standardFormatId;
        const deck = await standard[standardFunction]();
        res.send(deck);
    }
    launch();
})

//Modern api routes
app.get('/modern', (req, res) => {
    async function launch(){
        const deck = await modern.last2Months();
        res.send(deck);
    }
    launch();
})

app.get('/modern/:modernFormatId', (req, res) => {
    async function launch(){
        const modernFunction = req.params.modernFormatId;
        const deck = await modern[modernFunction]();
        res.send(deck);
    }
    launch();
})

//Vintage api routes
app.get('/vintage', (req, res) => {
    async function launch(){
        const deck = await vintage.last4Months();
        res.send(deck);
    }
    launch();
})

app.get('/vintage/:vintageFormatId', (req, res) => {
    async function launch(){
        const vintageFunction = req.params.vintageFormatId;
        const deck = await vintage[vintageFunction]();
        res.send(deck);
    }
    launch();
})

//Legacy api routes
app.get('/legacy', (req, res) => {
    async function launch(){
        const deck = await legacy.last2Months();
        res.send(deck);
    }
    launch();
})

app.get('/legacy/:legacyFormatId', (req, res) => {
    async function launch(){
        const legacyFunction = req.params.legacyFormatId;
        const deck = await legacy[legacyFunction]();
        res.send(deck);
    }
    launch();
})

//Pioneer api routes
app.get('/pioneer', (req, res) => {
    async function launch(){
        const deck = await pioneer.last2Months();
        res.send(deck);
    }
    launch();
})

app.get('/pioneer/:pioneerFormatId', (req, res) => {
    async function launch(){
        const pioneerFunction = req.params.pioneerFormatId;
        const deck = await pioneer[pioneerFunction]();
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

//cEDH api routes
app.get('/cedh', (req, res) => {
    async function launch(){
        const deck = await cedh.cedh();
        res.send(deck);
    }
    launch();
})

//Alchemy api routes
app.get('/alchemy', (req, res) => {
    async function launch(){
        const deck = await alchemy.alchemy();
        res.send(deck);
    }
    launch();
})

//Peasant api routes
app.get('/peasant', (req, res) => {
    async function launch(){
        const deck = await peasant.peasant();
        res.send(deck);
    }
    launch();
})

//Block api routes
app.get('/block', (req, res) => {
    async function launch(){
        const deck = await block.block();
        res.send(deck);
    }
    launch();
})

//Extended api routes
app.get('/extended', (req, res) => {
    async function launch(){
        const deck = await extended.extended();
        res.send(deck);
    }
    launch();
})

//Highlander api routes
app.get('/highlander', (req, res) => {
    async function launch(){
        const deck = await highlander.highlander();
        res.send(deck);
    }
    launch();
})

//Canadian Highlander api routes
app.get('/canadianhighlander', (req, res) => {
    async function launch(){
        const deck = await canadian_highlander.canadianHighlander();
        res.send(deck);
    }
    launch();
})

app.listen(port, () => {
    console.log("Listening is port $1", [port]);
})
