const express = require('express');
const router = express.Router();
const Card = require('../../mongoose/cardDatabase');

router.route('/:cardId')
    .get((req, res) => {
        async function launch(){
            const deck = await Card.find({name: `${req.params.cardId}`})
            res.status(201).send(deck);
        }
        launch();
    })
module.exports = router;
