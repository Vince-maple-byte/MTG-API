const express = require('express');
const router = express.Router();
const canadianHighlander = require('../../Decks/canadianHighlander.js');
const Deck = require('../../mongoose/database.js');


router.route('/')
    .get((req, res) => {
        async function launch(){
            const deck = await Deck.find({format: 'Canadian Highlander'});
            res.send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const deck = await canadianHighlander.canadianHighlander();
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    deckImage: deck[i].deckImage,
                    deckPercentage: deck[i].deckPercentage,
                    format: 'Canadian Highlander',
                    formatVersion: 'All Canadian Highlander Decks',
                    url: deck[i].url,
                    cards: deck[i].cards
                })
                await createDeck.save();
            }
            res.send("Decks have been created");
        }
        launch();
    })
    .delete((req, res) => {
        async function launch(){
            await Deck.deleteMany({format: 'Canadian Highlander'});
            res.send("Everything in the canadian highlander format has been deleted");
        }
        launch();
    })

module.exports = router;