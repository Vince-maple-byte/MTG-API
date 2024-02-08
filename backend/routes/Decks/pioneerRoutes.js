const express = require('express');
const router = express.Router();
const pioneer = require('../../Decks/pioneer.js')
const Deck = require('../../mongoose/database.js')

router.route('/')
    .get((req, res) => {
        async function launch(){
            try {
                const deck = await Deck.find({format: 'Pioneer'});
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
                const deck = await pioneer.pioneer();
                for(let i = 0; i < deck.length; i++){
                    const createDeck = await new Deck({
                        deckName: deck[i].deckName,
                        deckImage: deck[i].deckImage,
                        deckPercentage: deck[i].deckPercentage,
                        format: 'Pioneer',
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
                const deck = await Deck.deleteMany({format: "Pioneer"});
                res.status(200).send("Everything in the pioneer format has been deleted");
            } catch (error) {
                res.status(400);
                res.send(error);
            }
        }
        launch();
    })

router.route('/:pioneerId')
    .get((req,res) => {
        try {
            async function launch(){
                const deck = await Deck.findMany({format: 'Pioneer', formatVersion: `${req.params.pioneerId}`})
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
                const deck = await pioneer.pioneerFormat(req.params.pioneerId);
                for(let i = 0; i < deck.length; i++){
                    const createDeck = await new Deck({
                        deckName: deck[i].deckName,
                        deckImage: deck[i].deckImage,
                        deckPercentage: deck[i].deckPercentage,
                        format: 'Pioneer',
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
            const deck = await Deck.deleteMany({format: 'Pioneer', formatVersion: `${req.params.pioneerId}`});
            res.status(200).send(`Everything in the pioneer format version ${req.params.pioneerId} has been deleted`);
        }
        launch();
    })

module.exports = router;