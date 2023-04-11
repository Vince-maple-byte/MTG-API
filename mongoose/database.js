const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    deckName: String,
    format: String, 
    formatVersion: String,
    url: String,
    cards: [String]
});

module.exports = mongoose.model('Deck', deckSchema);