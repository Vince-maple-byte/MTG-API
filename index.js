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
        const deck = await standard.standard();
        res.send(deck);
    }
    launch();
})

app.get('/standard/:standardFormatId', (req, res) => {
    async function launch(){
        const standardFunction = req.params.standardFormatId;
        const deck = await standard.standardFormat(`${standardFunction}`);
        res.send(deck);
    }
    launch();
})

//Modern api routes
app.get('/modern', (req, res) => {
    async function launch(){
        const deck = await modern.modern();
        res.send(deck);
    }
    launch();
})

app.get('/modern/:modernFormatId', (req, res) => {
    async function launch(){
        const modernFunction = req.params.modernFormatId;
        const deck = await modern.modernFormat(modernFunction);
        res.send(deck);
    }
    launch();
})

//Vintage api routes
app.get('/vintage', (req, res) => {
    async function launch(){
        const deck = await vintage.vintage();
        res.send(deck);
    }
    launch();
})

app.get('/vintage/:vintageFormatId', (req, res) => {
    async function launch(){
        const vintageFunction = req.params.vintageFormatId;
        const deck = await vintage.vintageFormat(vintageFunction);
        res.send(deck);
    }
    launch();
})

//Legacy api routes
app.get('/legacy', (req, res) => {
    async function launch(){
        const deck = await legacy.legacy();
        res.send(deck);
    }
    launch();
})

app.get('/legacy/:legacyFormatId', (req, res) => {
    async function launch(){
        const legacyFunction = req.params.legacyFormatId;
        const deck = await legacy.legacyFormat(legacyFunction);
        res.send(deck);
    }
    launch();
})

//Pioneer api routes
app.get('/pioneer', (req, res) => {
    async function launch(){
        const deck = await pioneer.pioneer();
        res.send(deck);
    }
    launch();
})

app.get('/pioneer/:pioneerFormatId', (req, res) => {
    async function launch(){
        const pioneerFunction = req.params.pioneerFormatId;
        const deck = await pioneer.pioneerFormat(pioneerFunction);
        res.send(deck);
    }
    launch();
})

//Historic api routes
app.get('/historic', (req, res) => {
    async function launch(){
        const deck = await historic.historic();
        res.send(deck);
    }
    launch();
})

app.get('/historic/:historicFormatId', (req, res) => {
    async function launch(){
        const historicFunction = req.params.historicFormatId;
        const deck = await historic.historicFormat(historicFunction);
        res.send(deck);
    }
    launch();
})

//Explorer api routes
app.get('/explorer', (req, res) => {
    async function launch(){
        const deck = await explorer.last4Months();
        res.send(deck);
    }
    launch();
})

app.get('/explorer/:explorerFormatId', (req, res) => {
    async function launch(){
        const explorerFunction = req.params.explorerFormatId;
        const deck = await explorer[explorerFunction]();
        res.send(deck);
    }
    launch();
})

//Pauper api routes
app.get('/pauper', (req, res) => {
    async function launch(){
        const deck = await pauper.pauper();
        res.send(deck);
    }
    launch();
})

app.get('/pauper/:pauperFormatId', (req, res) => {
    async function launch(){
        const pauperFunction = req.params.pauperFormatId;
        const deck = await pauper.pauperFormat(pauperFunction);
        res.send(deck);
    }
    launch();
})

//Duel Commander api routes
app.get('/duel-commander', (req, res) => {
    async function launch(){
        const deck = await duelCommander.duelCommander();
        res.send(deck);
    }
    launch();
})

app.get('/duel-commander/:duel-commanderFormatId', (req, res) => {
    async function launch(){
        const duelcommanderFunction = req.params.duelcommanderFormatId;
        const deck = await duelCommander.duelCommanderFormat(duelcommanderFunction);
        res.send(deck);
    }
    launch();
})


//cEDH api routes: Ignore for now
app.get('/cedh', (req, res) => {
    async function launch(){
        const deck = await cedh.start();
        res.send(deck);
    }
    launch();
})

//Alchemy api routes. Only has one valid api route
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

app.get('/peasant/:peasantFormatId', (req, res) => {
    async function launch(){
        const peasantFunction = req.params.peasantFormatId;
        const deck = await peasant.peasantFormat(peasantFunction);
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

app.get('/block/:blockId', (req, res) => {
    async function launch(){
        const blockFunction = req.params.blockId;
        const deck = await block.blockFormat(blockFunction);
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

app.get('/extended/:extendedId', (req, res) => {
    async function launch(){
        const extendedFunction = req.params.extendedId;
        const deck = await extended.extendedFormat(extendedFunction);
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

app.get('/highlander/:highlanderId', (req, res) => {
    async function launch(){
        const highlanderFunction = req.params.highlanderId;
        const deck = await highlander.highlanderFormat(highlanderFunction);
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

app.get('/redirect', (req, res) => {
    res.redirect('https://google.com')
})

app.listen(port, () => {
    console.log("Listening is port $1", [port]);
})
