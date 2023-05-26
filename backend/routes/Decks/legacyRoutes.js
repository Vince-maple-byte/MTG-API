const express = require('express');
const router = express.Router();
const legacy  = require('../../Decks/legacy.js');
const Deck = require('../../mongoose/database.js')

router.route('/')
    .get((req, res) => {
        async function launch(){
            try {
                const deck = await Deck.find({format: 'Legacy'});
                res.status(200).send(deck);
            } catch (error) {
                res.status(400).send(error);
            }
        }
        launch();
    })
    .post((req,res) => {
        async function launch(){
            try {
                const deck = await legacy.legacy();
                for(let i = 0; i < deck.length; i++){
                    const createDeck = await new Deck({
                        deckName: deck[i].deckName,
                        format: 'Legacy',
                        formatVersion: deck[i].format,
                        url: deck[i].url,
                        cards: deck[i].cards
                    })
                    await createDeck.save();
                }
                res.status(200).send("Decks have been saved to the database") 
            } catch (error) {
                res.status(400).send(error);
            }
        }
        launch();
    })
    .delete((req,res) => {
        async function launch(){
            try {
                const deck = await Deck.deleteMany({format: "Legacy"});
                res.status(200).send("Everything in the legacy format has been deleted");
            } catch (error) {
                res.status(400);
                res.send(error);
            }
        }
        launch();
    })

router.route('/:legacyId')
    .get((req,res) => {
        try {
            async function launch(){
                const deck = await Deck.find({format: 'Legacy', formatVersion: `${req.params.legacyId}`})
                res.status(200).send(deck);
            }
            launch();
        } catch (error) {
            res.status(400).send(error);
        }
        
    })
    .post((req,res) => {
        try {
            async function launch(){
                const deck = await legacy.legacyFormat(req.params.legacyId);
                for(let i = 0; i < deck.length; i++){
                    const createDeck = await new Deck({
                        deckName: deck[i].deckName,
                        format: 'Legacy',
                        formatVersion: deck[i].format,
                        url: deck[i].url,
                        cards: deck[i].cards
                    })
                    createDeck.save();
                }
                res.status(200).send("Decks have been saved to the database") 
            }
            launch();
            
        } catch (error) {
            res.status(400).send(error);
        }
        
    })
    .delete((req,res) => {
        async function launch(){
            const deck = await Deck.deleteMany({format: 'Legacy', formatVersion: `${req.params.legacyId}`});
            res.status(200).send(`Everything in the legacy format version ${req.params.legacyId} has been deleted`);
        }
        launch();
    })

module.exports = router;