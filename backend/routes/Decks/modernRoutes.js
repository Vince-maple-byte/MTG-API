const express = require('express');
const modern  = require('../../Decks/modern.js');
const router = express.Router();
const Deck = require('../../mongoose/database.js')

//Modern api routes
router.route('/')
    .get((req, res) => {
        async function launch(){
            try {
                const deck = await Deck.find({format: 'Modern'});
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
                const deck = await modern.modern();
                for(let i = 0; i < deck.length; i++){
                    const createDeck = await new Deck({
                        deckName: deck[i].deckName,
                        format: 'Modern',
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
                const deck = await Deck.deleteMany({format: "Modern"});
                res.status(200).send("Everything in the Modern format has been deleted");
            } catch (error) {
                res.status(400);
                res.send(error);
            }
        }
        launch();
    })

router.route('/:modernId')
    .get((req,res) => {
        try {
            async function launch(){
                const deck = await Deck.find({format: 'Modern', formatVersion: `${req.params.modernId}`})
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
                const deck = await modern.modernFormat(req.params.modernId);
                for(let i = 0; i < deck.length; i++){
                    const createDeck = await new Deck({
                        deckName: deck[i].deckName,
                        format: 'Modern',
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
            const deck = await Deck.deleteMany({format: 'Modern', formatVersion: `${req.params.modernId}`});
            res.status(200).send(`Everything in the modern format version ${req.params.modernId} has been deleted`);
        }
        launch();
    })

module.exports = router;