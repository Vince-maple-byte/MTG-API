const express = require('express');
const router = express.Router();
const explorer = require('../../Decks/explorer.js');
const Deck = require('../../mongoose/database.js')

router.route('/')
    .get((req, res) => {
        async function launch(){
            try {
                const deck = await Deck.find({format: 'Explorer'});
                res.status(200).send(deck)
            } catch (error) {
                res.status(400).send(error);
            }
        }
        launch();
    })
    .post((req,res) => {
        async function launch(){
            try {
                const deck = await explorer.last4Months();
                for(let i = 0; i < deck.length; i++){
                    const createDeck = new Deck({
                        deckName: deck[i].deckName,
                        deckImage: deck[i].deckImage,
                        deckPercentage: deck[i].deckPercentage,
                        format: 'Explorer',
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
                const deck = await Deck.deleteMany({format: "Explorer"});
                res.status(200).send("Everything in the Explorer format has been deleted");
            } catch (error) {
                res.status(400);
                res.send(error);
            }
        }
        launch();
    });

router.route('/:explorerFormatId')
    .get((req,res) => {
        try {
            async function launch(){
                const deck = await Deck.find({format: 'Explorer', formatVersion: `${req.params.explorerFormatId}`})
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
                const format = req.params.explorerFormatId;
                if(format === 'last4Months'){
                    const deck = await explorer.last4Months();
                    for(let i = 0; i < deck.length; i++){
                        const createDeck = await new Deck({
                            deckName: deck[i].deckName,
                            deckImage: deck[i].deckImage,
                            deckPercentage: deck[i].deckPercentage,
                            format: 'Explorer',
                            formatVersion: deck[i].format,
                            url: deck[i].url,
                            cards: deck[i].cards
                        })
                        await createDeck.save();
                    }
                }
                else{
                    const deck = await explorer.allExplorerDecks();
                    for(let i = 0; i < deck.length; i++){
                        const createDeck = await new Deck({
                            deckName: deck[i].deckName,
                            deckImage: deck[i].deckImage,
                            deckPercentage: deck[i].deckPercentage,
                            format: 'Explorer',
                            formatVersion: deck[i].format,
                            url: deck[i].url,
                            cards: deck[i].cards
                        })
                        await createDeck.save();
                    }
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
            const deck = await Deck.deleteMany({format: 'Explorer', formatVersion: `${req.params.explorerFormatId}`});
            res.status(200).send(`Everything in the explorer format version ${req.params.explorerFormatId} has been deleted`);
        }
        launch();
    })

module.exports = router;