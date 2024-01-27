const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    deckName: mongoose.SchemaTypes.Mixed,
    deckImage: mongoose.SchemaTypes.Mixed,
    deckPercentage: mongoose.SchemaTypes.Mixed,
    format: String, 
    formatVersion: mongoose.SchemaTypes.Mixed,
    url: mongoose.SchemaTypes.Mixed,
    cards: [mongoose.SchemaTypes.Mixed]
});

module.exports = mongoose.model('Deck', deckSchema);