const express = require('express');
const alchemy = require('../../Decks/alchemy.js');
const router = express.Router();

//Getting the magic the gathering deck
router.get('/', (req, res) => {
    async function launch(){
        const deck = await alchemy.alchemy();
        res.send(deck);
    }
    launch();
});

//Need to make an update deck

//Need to make a delete deck

//Need to make a create deck into the database

module.exports = router;