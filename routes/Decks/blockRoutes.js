const express = require('express');
const router = express.Router();
const block = require('../../Decks/block.js');
const Deck = require('../../mongoose/database.js');

router.route('/')
    .get((req, res) => {
        async function launch(){
            const deck = await Deck.find({format:"Block"})
            res.send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const deck = await block.block();
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    format: 'Block',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                });
                await createDeck.save();
            }
            res.send("Decks have been created");
        }
        launch();
    })
    .delete((req, res) => {
        async function launch(){
            await Deck.deleteMany({format: 'Block'});
            res.send("Everything in the block format has been deleted");
        }
        launch();
    })

router.route('/:blockId')
    .get((req, res) => {
        async function launch(){
            const blockFunction = req.params.blockId;
            const deck = await Deck.find({format:'Block', formatVersion:`${blockFunction}`});
            res.send(deck);
        }
        launch();
    })
    .post((req, res) => {
        async function launch(){
            const blockFunction = req.params.blockId;
            const deck = await block.blockFormat(`${blockFunction}`);
            for(let i = 0; i < deck.length; i++){
                const createDeck = new Deck({
                    deckName: deck[i].deckName,
                    format: 'Block',
                    formatVersion: deck[i].format,
                    url: deck[i].url,
                    cards: deck[i].cards
                });
                await createDeck.save();
            }
            res.send("Decks have been created");
        }
        launch();
    })
    .delete((req, res) => {
        async function launch(){
            const blockFunction = req.params.blockId;
            const deck = await Deck.deleteMany({format: 'Block', formatVersion: `${blockFunction}`});
            res.send(`Everything in the block format version ${blockFunction} has been deleted`);
        }
        launch();
    })

module.exports = router;