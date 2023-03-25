const express = require('express');
const alchemy = require('../../Decks/alchemy.js');
const router = express.Router();

router.get('/', (req, res) => {
    async function launch(){
        const deck = await alchemy.alchemy();
        res.send(deck);
    }
    launch();
})

module.exports = router;