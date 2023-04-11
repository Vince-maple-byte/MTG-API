const express = require('express');
const alchemy = require('../../Decks/alchemy.js');
const Deck = require('../../mongoose/database.js')
const router = express.Router();

//Getting the magic the gathering deck for the alchemy format
router.route('/')
    .get((req, res) => {
        async function launch(){
            const deck = await Deck.find({format: 'Alchemy'});
            res.send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const deck = await alchemy.alchemy();
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    format: 'Alchemy',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                })
                await createDeck.save();
            }
            res.send("Decks have been saved to the database")
        }
        launch();
    })
    .delete((req, res) => {
        async function launch(){
            const deck = await Deck.deleteMany({format: 'Alchemy'});
            res.send("Everything in the alchemy format has been deleted");
        }
        launch();
    })

module.exports = router;