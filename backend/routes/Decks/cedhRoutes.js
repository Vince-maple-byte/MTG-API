const express = require('express');
const router = express.Router();
const cedh = require('../../Decks/cedh.js');

router.get('/', (req, res) => {
    async function launch(){
        const deck = await cedh.start();
        res.send(deck);
    }
    launch();
})

module.exports = router;