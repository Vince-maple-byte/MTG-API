const express = require('express');
const router = express.Router();
const duelCommander = require('../../Decks/duel-commander.js');
const Deck = require('../../mongoose/database.js');

router.route('/')
    .get((req, res) => {
        async function launch(){
            const deck = await Deck.find({format: 'Duel Commander'});
            res.send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const deck = await duelCommander.duelCommander();
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    format: 'Duel Commander',
                    formatVersion: 'last3Months',
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
            const deck = await Deck.deleteMany({format: 'Duel Commander'});
            res.send("Everything in the duel commander format has been deleted");
        }
        launch();
    })

router.route('/:duelCommanderFormatId')
    .get((req, res) => {
        async function launch(){
            const duelcommanderFunction = req.params.duelCommanderFormatId;
            const deck = await Deck.find({format: 'Duel Commander', formatVersion: `${duelcommanderFunction}`});
            res.send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const duelcommanderFunction = req.params.standardFormatId;
            const deck = await standard.standardFormat(`${duelcommanderFunction}`);
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    format: 'Standard',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                })
                await createDeck.save();
            }
            res.send(`Decks in the duel commander format version ${duelcommanderFunction} have been created`);
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