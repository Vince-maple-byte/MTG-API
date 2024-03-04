const express = require('express');
const router = express.Router();
const Card = require('../../mongoose/cardDatabase');

router.route('/:cardId*')
    .get(async (req, res) => {
        try {
            let deck = await Card.find({name: req.params.cardId});

            if(deck === undefined || deck.length == 0){
                let escapedCardId = req.params.cardId.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                deck = await Card.find({ name: { "$regex": escapedCardId } });
            }
            res.status(201).send(deck);
        } catch (error) {
            console.errror(error);
            res.status(501).send(error + "")
        }
    })
router.route('/array')
    .post(async (req, res) => {
        try {
            //Make sure to send the list of card names as cards in the request body
            const cards = req.body.cards 
            const cardObject = await Card.find({name:{$in:cards}})

            res.status(201).send(cardObject);
        } catch (error) {
            console.error(error);
            res.status(501).send(error + "")
        }
    })
router.route('/array/notALand')
    .post(async (req, res) => {
        try {
            //Make sure to send the list of card names as cards in the request body
            const cards = req.body.cards  
            const cardObject = await Card.find({name:{$in:cards}, type_line:{$ne:"Land"}})
            res.status(201).send(cardObject);
        } catch (error) {
            console.error(error);
            res.status(501).send(error + "")
        }
    })
module.exports = router;
