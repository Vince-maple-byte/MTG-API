const express = require('express');
const router = express.Router();
const peasant  = require('../../Decks/peasant.js');

router.get('/', (req, res) => {
    async function launch(){
        const deck = await peasant.peasant();
        res.send(deck);
    }
    launch();
})

router.get('/:peasantFormatId', (req, res) => {
    async function launch(){
        const peasantFunction = req.params.peasantFormatId;
        const deck = await peasant.peasantFormat(peasantFunction);
        res.send(deck);
    }
    launch();
})

module.exports = router;