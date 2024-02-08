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
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    deckImage: deck[i].deckImage,
                    deckPercentage: deck[i].deckPercentage,
                    format: 'Standard',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                })
                await createDeck.save();
            }
            
            res.send("Decks have been created");
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

router.route('/:standardFormatId')
    .get((req, res) => {
        async function launch(){
            const standardFunction = req.params.standardFormatId;
            const deck = await Deck.find({format: 'Standard', formatVersion: `${standardFunction}`});
            res.send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const standardFunction = req.params.standardFormatId;
            const deck = await standard.standardFormat(`${standardFunction}`);
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    deckImage: deck[i].deckImage,
                    deckPercentage: deck[i].deckPercentage,
                    format: 'Standard',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                })
                await createDeck.save();
            }
            res.send(`Decks in the standard format version ${standardFunction} have been created`);
        }
        launch();
    })
    .delete((req, res) => {
        async function launch(){
            const standardFunction = req.params.standardFormatId;
            const deck = await Deck.deleteMany({format: 'Standard', formatVersion: `${standardFunction}`});
            res.send(`Everything in the standard format version ${standardFunction} has been deleted`);
        }
        launch();
    })

module.exports = router;