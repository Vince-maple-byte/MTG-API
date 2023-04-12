const express = require('express');
const router = express.Router();
const canadianHighlander = require('../../Decks/canadianhighlander.js');
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
                    format: 'Canadian Highlander',
                    formatVersion: 'allCanadianHighlanderDecks',
                    url: deck[i].cards
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