//We are using this so that this is going to be the main entry point for the npm package
//The user just needs to type the 
module.exports = {
    alchemy: require('../Decks/alchemy'),
    block: require('../Decks/block'),
    canadianHighlander: require('../Decks/canadianHighlander'),
    duelCommander: require('../Decks/duel-commander'),
    explorer: require('../Decks/explorer'),
    extended: require('../Decks/extended'),
    highlander: require('../Decks/highlander'),
    historic: require('../Decks/historic'),
    legacy: require('../Decks/legacy'),
    modern: require('../Decks/modern'),
    pauper: require('../Decks/pauper'),
    peasant: require('../Decks/peasant'),
    pioneer: require('../Decks/pioneer'),
    standard: require('../Decks/standard'),
    vintage: require('../Decks/vintage')
}