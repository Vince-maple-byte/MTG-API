const express = require('express');
const router = express.Router();
const Deck = require('../../mongoose/database.js');

router.route('/')
  .post(async (req, res) => {
    try {
      const deck = await Deck.find({
        deckName: `${req.body.deckName}`,
        format: `${req.body.format}`,
        formatVersion: `${req.body.formatVersion}`
      });
      res.send(deck);
    } catch (error) {
      console.error('Error in POST /deck route:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
