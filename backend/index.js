const express = require('express');
const mongoose = require('mongoose');
const mongooseConnection = require('./mongoose/mongoose-script.js');
const cors = require('cors')
const app = express();
const port = 3000;


app.use(cors());
//Establish the connection with the mongodb collection
mongooseConnection.main();



//Making all of the routes

app.get('/', (req, res) => {
    res.send('Select a MTG format to get data');
})

//Card information route
const card = require('./routes/Cards/cardRoutes.js');
app.use('/card', card)

//Standard api routes
const standard = require('./routes/Decks/standardRoutes.js');
app.use('/standard', standard);

//Modern api routes
const modern = require('./routes/Decks/modernRoutes.js');
app.use('/modern', modern);

//Vintage api routes
const vintage = require('./routes/Decks/vintageRoutes.js');
app.use('/vintage', vintage);

//Legacy api routes
const legacy = require('./routes/Decks/legacyRoutes.js');
app.use('/legacy', legacy);

//Pioneer api routes
const pioneer = require('./routes/Decks/pioneerRoutes.js');
app.use('/pioneer', pioneer);

//Historic api routes
const historic = require('./routes/Decks/historicRoutes.js');
app.use('/historic', historic);

//Explorer api routes
const explorer = require('./routes/Decks/explorerRoutes.js');
app.use('/explorer', explorer);

//Pauper api routes
const pauper = require('./routes/Decks/pauperRoutes.js');
app.use('/pauper', pauper);

//Duel Commander api routes
const duelCommander = require('./routes/Decks/duel-commanderRoutes.js');
app.use('/duel-commander', duelCommander);

//cEDH api routes: Ignore for now
const cedh = require('./routes/Decks/cedhRoutes.js');
app.use('/cedh', cedh);

//Alchemy api routes. Only has one valid api route
const alchemy = require('./routes/Decks/alchemyRoutes.js');
app.use('/alchemy', alchemy);

//Peasant api routes
const peasant = require('./routes/Decks/peasantRoutes.js');
app.use('/peasant', peasant);

//Block api routes
const block = require('./routes/Decks/blockRoutes.js');
app.use('/block', block);

//Extended api routes
const extended = require('./routes/Decks/extendedRoutes.js');
app.use('/extended', extended);

//Highlander api routes
const highlander = require('./routes/Decks/highlanderRoutes.js');
app.use('/highlander', highlander);

//Canadian Highlander api routes
const canadianHighlander = require('./routes/Decks/canadianHighlanderRoutes.js');
app.use('/canadianHighlander', canadianHighlander);

app.listen(port, () => {
    console.log("Listening is port $1", [port]);
})