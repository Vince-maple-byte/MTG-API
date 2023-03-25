const express = require('express');
const router = express.Router();
const legacy  = require('../../Decks/legacy.js');

router.get('/', (req, res) => {
    async function launch(){
        const deck = await legacy.legacy();
        res.send(deck);
    }
    launch();
})

router.get('/:legacyFormatId', (req, res) => {
    async function launch(){
        const legacyFunction = req.params.legacyFormatId;
        const deck = await legacy.legacyFormat(legacyFunction);
        res.send(deck);
    }
    launch();
})
module.exports = router;