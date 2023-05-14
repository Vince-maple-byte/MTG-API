const express = require('express');
const router = express.Router();
const extended = require('../../Decks/extended.js');
const Deck = require("../../mongoose/database.js");

router.route('/')
    .get((req, res) => {
        async function launch(){
            const deck = await Deck.find({format:"Extended"})
            res.status(200).send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const deck = await extended.extended();
            for(let i = 0; i < deck.length; i++){
                const createDeck = await new Deck({
                    deckName: deck[i].deckName,
                    format: 'Extended',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                });
                await createDeck.save();
            }
            res.status(200).send("Decks have been created");
        }
        launch();
    })
    .delete((req, res) => {
        async function launch(){
            await Deck.deleteMany({format: 'Extended'});
            res.status(200).send("Everything in the Extended format has been deleted");
        }
        launch();
    })

router.route('/:extendedId')
    .get((req, res) => {
        async function launch(){
            const deck = await Deck.find({format:'Extended', formatVersion:`${req.params.extendedId}`});
            res.status(200).send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const deck = await extended.extendedFormat(req.params.extendedId);
            for(let i = 0; i < deck.length; i++){
                const createDeck = await new Deck({
                    deckName: deck[i].deckName,
                    format: 'Extended',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                });
                await createDeck.save();
            }
            res.status(200).send("Decks have been created");
        }
        launch();
    })
    .delete((req, res) => {
        async function launch(){
            const deck = await Deck.deleteMany({format: 'Block', formatVersion: `${req.params.extendedId}`});
            res.status(200).send(`Everything in the block format version ${req.params.extendedId} has been deleted`);
        }
        launch();
    })

module.exports = router;