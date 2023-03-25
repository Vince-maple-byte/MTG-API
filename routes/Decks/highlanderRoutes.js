const express = require('express');
const router = express.Router();
const highlander = require('../../Decks/highlander.js');


router.get('/', (req, res) => {
    async function launch(){
        const deck = await highlander.highlander();
        res.send(deck);
    }
    launch();
})

router.get('/:highlanderId', (req, res) => {
    async function launch(){
        const highlanderFunction = req.params.highlanderId;
        const deck = await highlander.highlanderFormat(highlanderFunction);
        res.send(deck);
    }
    launch();
})
module.exports = router;