const express = require('express');
const router = express.Router();
const vintage  = require('../../Decks/vintage.js');

router.get('/', (req, res) => {
    async function launch(){
        const deck = await vintage.vintage();
        res.send(deck);
    }
    launch();
})

router.get('/:vintageFormatId', (req, res) => {
    async function launch(){
        const vintageFunction = req.params.vintageFormatId;
        const deck = await vintage.vintageFormat(vintageFunction);
        res.send(deck);
    }
    launch();
})
module.exports = router;