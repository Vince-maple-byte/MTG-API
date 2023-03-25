const express = require('express');
const router = express.Router();
const explorer = require('../../Decks/explorer.js');

router.get('/', (req, res) => {
    async function launch(){
        const deck = await explorer.last4Months();
        res.send(deck);
    }
    launch();
})

router.get('/:explorerFormatId', (req, res) => {
    async function launch(){
        const explorerFunction = req.params.explorerFormatId;
        const deck = await explorer[explorerFunction]();
        res.send(deck);
    }
    launch();
})

module.exports = router;