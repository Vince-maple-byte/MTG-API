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
                    deckImage: deck[i].deckImage,
                    deckPercentage: deck[i].deckPercentage,
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
            const duelCommanderFunction = req.params.duelCommanderFormatId;
            const deck = await duelCommander.duelCommanderFormat(`${duelCommanderFunction}`);
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    deckImage: deck[i].deckImage,
                    deckPercentage: deck[i].deckPercentage,
                    format: 'Duel Commander',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                })
                await createDeck.save();
            }
            res.send(`Decks in the duel commander format version ${duelCommanderFunction} have been created`);
        }
        launch();
    })
    .delete((req, res) => {
        async function launch(){
            const duelCommanderFunction = req.params.duelCommanderFormatId;
            const deck = await Deck.deleteMany({format: 'Duel Commander', formatVersion: `${duelCommanderFunction}`});
            res.send(`Everything in the Duel Commander format version ${duelCommanderFunction} has been deleted`);
        }
        launch();
    })

module.exports = router;