const express = require('express');
const router = express.Router();
const duelCommander = require('../../Decks/duel-commander.js')

app.get('/', (req, res) => {
    async function launch(){
        const deck = await duelCommander.duelCommander();
        res.send(deck);
    }
    launch();
})

app.get('/:duel-commanderFormatId', (req, res) => {
    async function launch(){
        const duelcommanderFunction = req.params.duelcommanderFormatId;
        const deck = await duelCommander.duelCommanderFormat(duelcommanderFunction);
        res.send(deck);
    }
    launch();
})

module.exports = router;