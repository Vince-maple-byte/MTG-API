const express = require('express');
const modern  = require('../../Decks/modern.js');
const router = express.Router();

//Modern api routes
router.get('/', (req, res) => {
    async function launch(){
        const deck = await modern.modern();
        res.send(deck);
    }
    launch();
})

router.get('/:modernFormatId', (req, res) => {
    async function launch(){
        const modernFunction = req.params.modernFormatId;
        const deck = await modern.modernFormat(modernFunction);
        res.send(deck);
    }
    launch();
})

module.exports = router;