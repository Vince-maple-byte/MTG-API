const express = require('express');
const router = express.Router();
const highlander = require('../../Decks/highlander.js');
const Deck = require("../../mongoose/database.js");

router.route('/')
    .get((req, res) => {
        async function launch(){
            try {
                const deck = await Deck.find({format: 'Highlander'});
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
                const deck = await highlander.highlander();
                for(let i = 0; i < deck.length; i++){
                    const createDeck = await new Deck({
                        deckName: deck[i].deckName,
                        deckImage: deck[i].deckImage,
                        deckPercentage: deck[i].deckPercentage,
                        format: 'Highlander',
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
                const deck = await Deck.deleteMany({format: "Highlander"});
                res.status(200).send("Everything in the highlander format has been deleted");
            } catch (error) {
                res.status(400);
                res.send(error);
            }
        }
        launch();
    })

router.route('/:highlanderId')
    .get((req,res) => {
        try {
            async function launch(){
                const deck = await Deck.findMany({format: 'Highlander', formatVersion: `${req.params.highlanderId}`})
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
                const deck = await highlander.highlanderFormat(req.params.highlanderId);
                for(let i = 0; i < deck.length; i++){
                    const createDeck = await new Deck({
                        deckName: deck[i].deckName,
                        deckImage: deck[i].deckImage,
                        deckPercentage: deck[i].deckPercentage,
                        format: 'Highlander',
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
            const deck = await Deck.deleteMany({format: 'Highlander', formatVersion: `${req.params.highlanderId}`});
            res.status(200).send(`Everything in the highlander format version ${req.params.highlanderId} has been deleted`);
        }
        launch();
    })

module.exports = router;