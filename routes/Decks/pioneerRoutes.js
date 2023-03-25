const express = require('express');
const router = express.Router();
const pioneer = require('../../Decks/pioneer.js')

router.get('/', (req, res) => {
    async function launch(){
        const deck = await pioneer.pioneer();
        res.send(deck);
    }
    launch();
})

router.get('/:pioneerFormatId', (req, res) => {
    async function launch(){
        const pioneerFunction = req.params.pioneerFormatId;
        const deck = await pioneer.pioneerFormat(pioneerFunction);
        res.send(deck);
    }
    launch();
})
module.exports = router;