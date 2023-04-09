const express = require('express');
const router = express.Router();
const duelCommander = require('../../Decks/duel-commander.js')

router.get('/', (req, res) => {
    async function launch(){
        const deck = await duelCommander.duelCommander();
        res.send(deck);
    }
    launch();
})

router.get('/:duel-commanderFormatId', (req, res) => {
    async function launch(){
        const duelcommanderFunction = req.params.duelcommanderFormatId;
        const deck = await duelCommander.duelCommanderFormat(duelcommanderFunction);
        res.send(deck);
    }
    launch();
})

module.exports = router;