const express = require('express');
const alchemy = require('../../Decks/alchemy.js');
const Deck = require('../../mongoose/database.js')
const router = express.Router();

//Getting the magic the gathering deck for the alchemy format
router.route('/')
    .get((req, res) => {
        async function launch(){
            const deck = await Deck.find({format: 'Alchemy'});
            res.status(200).send(deck);
        }
        launch();
    })
    //The post method first scrapes the decks and then creates the deck and saves it into the mongodb
    // database
    .post((req, res) => {
        async function launch(){
            const deck = await alchemy.alchemy();
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    deckImage: deck[i].deckImage,
                    deckPercentage: deck[i].deckPercentage,
                    format: 'Alchemy',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                })
                await createDeck.save();
            }
            res.status(200).send("Decks have been saved to the database")
        }
        launch();
    })
    //Deletes all of the decks in the format
    .delete((req, res) => {
        async function launch(){
            const deck = await Deck.deleteMany({format: 'Alchemy'});
            res.status(200).send("Everything in the alchemy format has been deleted");
        }
        launch();
    })

module.exports = router;