const express = require('express');
const standard  = require('../../Decks/standard.js');
const Deck = require('../../mongoose/database.js');
const router = express.Router();

//Standard api routes
router.route('/')
    .get((req, res) => {
        async function launch(){
            const deck = await Deck.find({format: 'Standard'});
            res.send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const deck = await standard.standard();
            const createDeck = new Deck({
                deckName: deck.deckName,
                format: 'Standard',
                formatVersion: deck.format,
                url: deck.url,
                cards: deck.cards
            })
            await createDeck.save();
            console.log("Decks have been created");
        }
        launch().catch(err => console.log(err))
    })
    .delete((req, res) => {
        async function launch(){
            const deck = await Deck.deleteMany({format: 'Standard'});
            res.send("Everything in the standard format has been deleted");
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