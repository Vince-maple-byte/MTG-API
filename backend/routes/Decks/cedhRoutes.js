const express = require('express');
const router = express.Router();
const cedh = require('../../Decks/cedh.js');
const Deck = require('../../mongoose/database.js')

router.get('/', (req, res) => {
    async function launch(){
        const deck = await cedh.start();
        res.send(deck);
    }
    launch();
})

router.post('/', (req, res) => {
    async function launch(){
        await cedh.start();
        //await cedh.deckUrl();
    }
    launch();
})

router.delete('/', (req, res) => {
    async function launch(){
        try {
            const deck = await Deck.deleteMany({format: 'cEDH'});
            res.status(200).send("Everything in the cEDH format has been deleted");
        } catch (error) {
            res.status(400);
            res.send(error + " This is bad");
        }
    }
    launch();
})

module.exports = router;