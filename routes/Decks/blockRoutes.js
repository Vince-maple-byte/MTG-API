const express = require('express');
const router = express.Router();
const block = require('../../Decks/block.js');

router.get('/', (req, res) => {
    async function launch(){
        const deck = await block.block();
        res.send(deck);
    }
    launch();
})

router.get('/:blockId', (req, res) => {
    async function launch(){
        const blockFunction = req.params.blockId;
        const deck = await block.blockFormat(blockFunction);
        res.send(deck);
    }
    launch();
})

module.exports = router;