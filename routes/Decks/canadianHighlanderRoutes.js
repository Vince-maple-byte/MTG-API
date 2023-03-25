const express = require('express');
const router = express.Router();
const canadianHighlander = require('../../Decks/canadianhighlander.js');


app.get('/', (req, res) => {
    async function launch(){
        const deck = await canadianHighlander.canadianHighlander();
        res.send(deck);
    }
    launch();
})

module.exports = router;