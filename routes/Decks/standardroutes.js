const express = require('express');
const standard  = require('../../Decks/standard.js');
const router = express.Router();

//Standard api routes
router.get('/', (req, res) => {
    async function launch(){
        const deck = await standard.standard();
        res.send(deck);
    }
    launch();
})

router.get('/:standardFormatId', (req, res) => {
    async function launch(){
        const standardFunction = req.params.standardFormatId;
        const deck = await standard.standardFormat(`${standardFunction}`);
        res.send(deck);
    }
    launch();
})

module.exports = router;