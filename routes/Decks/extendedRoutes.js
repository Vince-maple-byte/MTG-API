const express = require('express');
const router = express.Router();
const extended = require('../../Decks/extended.js');

router.get('/', (req, res) => {
    async function launch(){
        const deck = await extended.extended();
        res.send(deck);
    }
    launch();
})

router.get('/:extendedId', (req, res) => {
    async function launch(){
        const extendedFunction = req.params.extendedId;
        const deck = await extended.extendedFormat(extendedFunction);
        res.send(deck);
    }
    launch();
})

module.exports = router;