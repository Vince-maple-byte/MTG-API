const express = require('express');
const router = express.Router();
const pauper = require('../../Decks/pauper.js');

router.get('/', (req, res) => {
    async function launch(){
        const deck = await pauper.pauper();
        res.send(deck);
    }
    launch();
})

router.get('/:pauperFormatId', (req, res) => {
    async function launch(){
        const pauperFunction = req.params.pauperFormatId;
        const deck = await pauper.pauperFormat(pauperFunction);
        res.send(deck);
    }
    launch();
})

module.exports = router;
