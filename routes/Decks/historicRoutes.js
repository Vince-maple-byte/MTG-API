const express = require('express');
const router = express.Router();
const historic = require('../../Decks/historic.js')

router.get('/', (req, res) => {
    async function launch(){
        const deck = await historic.historic();
        res.send(deck);
    }
    launch();
})

router.get('/:historicFormatId', (req, res) => {
    async function launch(){
        const historicFunction = req.params.historicFormatId;
        const deck = await historic.historicFormat(historicFunction);
        res.send(deck);
    }
    launch();
})
module.exports = router;