const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    object: mongoose.SchemaTypes.Mixed, 
    id: mongoose.SchemaTypes.Mixed,
    oracle_id: mongoose.SchemaTypes.Mixed,
    multiverse_ids: [mongoose.SchemaTypes.Mixed],
    mtgo_id: mongoose.SchemaTypes.Mixed,
    arena_id: mongoose.SchemaTypes.Mixed,
    tcgplayer_id: mongoose.SchemaTypes.Mixed,
    cardmarket_id: mongoose.SchemaTypes.Mixed,
    name: mongoose.SchemaTypes.Mixed,
    lang: mongoose.SchemaTypes.Mixed,
    released_at: mongoose.SchemaTypes.Mixed,
    uri: mongoose.SchemaTypes.Mixed,
    scryfall_uri: mongoose.SchemaTypes.Mixed,
    layout: mongoose.SchemaTypes.Mixed,
    highres_image: mongoose.SchemaTypes.Mixed,
    image_status: mongoose.SchemaTypes.Mixed,
    image_uris: mongoose.SchemaTypes.Mixed,
    mana_cost: mongoose.SchemaTypes.Mixed,
    cmc: mongoose.SchemaTypes.Mixed,
    type_line: mongoose.SchemaTypes.Mixed,
    oracle_text: mongoose.SchemaTypes.Mixed,
    colors: [mongoose.SchemaTypes.Mixed],
    color_identity: [mongoose.SchemaTypes.Mixed],
    keywords: [mongoose.SchemaTypes.Mixed],
    produced_mana: [mongoose.SchemaTypes.Mixed],
    legalities: mongoose.SchemaTypes.Mixed,
    games: [mongoose.SchemaTypes.Mixed],
    reversed: mongoose.SchemaTypes.Mixed,
    foil: mongoose.SchemaTypes.Mixed,
    nonfoil: mongoose.SchemaTypes.Mixed,
    finishes: [mongoose.SchemaTypes.Mixed],
    oversized: mongoose.SchemaTypes.Mixed,
    promo: mongoose.SchemaTypes.Mixed,
    reprint: mongoose.SchemaTypes.Mixed,
    variation: mongoose.SchemaTypes.Mixed,
    set_id: mongoose.SchemaTypes.Mixed,
    set: mongoose.SchemaTypes.Mixed,
    set_name: mongoose.SchemaTypes.Mixed,
    set_type: mongoose.SchemaTypes.Mixed,
    set_uri: mongoose.SchemaTypes.Mixed,
    set_search_uri: mongoose.SchemaTypes.Mixed,
    scryfall_set_uri: mongoose.SchemaTypes.Mixed,
    rulings_uri: mongoose.SchemaTypes.Mixed,
    prints_search_uri: mongoose.SchemaTypes.Mixed,
    collector_number: mongoose.SchemaTypes.Mixed,
    digital: mongoose.SchemaTypes.Mixed,
    rarity: mongoose.SchemaTypes.Mixed,
    flavor_text: mongoose.SchemaTypes.Mixed,
    card_back_id: mongoose.SchemaTypes.Mixed,
    artist: mongoose.SchemaTypes.Mixed,
    artist_ids: [mongoose.SchemaTypes.Mixed],
    illustration_id: mongoose.SchemaTypes.Mixed,
    border_color: mongoose.SchemaTypes.Mixed,
    frame: mongoose.SchemaTypes.Mixed,
    full_art: mongoose.SchemaTypes.Mixed,
    textless: mongoose.SchemaTypes.Mixed,
    booster: mongoose.SchemaTypes.Mixed,
    story_spotlight: mongoose.SchemaTypes.Mixed,
    edhrec_rank: mongoose.SchemaTypes.Mixed,
    penny_rank: mongoose.SchemaTypes.Mixed,
    prices: mongoose.SchemaTypes.Mixed,
    related_uris: mongoose.SchemaTypes.Mixed,
    purchase_uris: mongoose.SchemaTypes.Mixed
});

module.exports = mongoose.model('Card', cardSchema);
