const puppeteer = require('puppeteer');
const Deck = require("../mongoose/database");

async function start(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.mtgtop8.com/format?f=cEDH", { waitUntil: 'networkidle0' });
    
    
    /*Have to extract all of the links for each deck archtype in standard and save it in a JSON object
    Don't forget to add the main url to the url saved in the json data when sending it out
    Ex. https://www.mtgtop8.com/ + url
    They all share the class name S14
    */
    let deckArchtypes = await page.evaluate( () => {
        const results = [];
        const mainUrl = 'https://www.mtgtop8.com/';
        const item = document.querySelectorAll('#cEDH_decks > div:nth-child(2) > div > div > div:nth-child(2) > a');
        //const percent = document.querySelectorAll('div:nth-child(2) > div:nth-child(2) > div:nth-child(1)');
        item.forEach(element => {
            results.push({
                deckName:  element.textContent, //Saves the deck archetype name 
                url: mainUrl + element.getAttribute('href') //Saves the url link of the deck archetype
            });
        });
        return results;
    });
    
    for(let i = 0; i < deckArchtypes.length; i++){
        const createDeck = await new Deck({
            deckName: deckArchtypes[i].deckName,
            format: 'cEDH',
            formatVersion: null,
            url: deckArchtypes[i].url,
            cards: null
        })
        await createDeck.save();
    }
    
    /*
    //Save the cards in an array with the number of each card in the deck(Complete)
    let cards = [];
    for (let i = 0; i < decksUrl.length; i++) {
        const url = decksUrl[i][0];
        await page.goto(`${url}`);
        cards[i] = await page.evaluate( () => {
            const results = [];
            //const mainUrl = 'https://www.mtgtop8.com/';
            const number = document.querySelector('.deck_line.hover_tr');
            results.push(
                number.textContent //Saves all of the cards with the amount in the deck
            );
            return results;
        })
    }

    //Final array with the deckName, deckUrl, and the cards all in one
    let finalDeck = [];
    for(let index = 0; index < decksUrl.length; index++){
        finalDeck[index] = {
            deckName: deckArchtypes[index].deckName, //Saves the deck archetype name 
            url: decksUrl[index][0], //Deck link
            cards: cards[index] // Cards
        }
    }
    */
    await browser.close();
    //return decksUrl;
}

async function deckUrl(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const deckArchtypes = await Deck.find({'format':'cEDH'}); //Looks for the decks in the with the format cEDH
    //This solves the issue of getting the links to each individual deck
    //Might only do one deck for each archetype since this is kind of overkill and could run into issues with server timing in the future.
    let decksUrl = []; //Creates an array for the deck url
    for (let i = 0; i < deckArchtypes.length; i++) {
        const url = deckArchtypes[i].url; //Get the deck archtype url
        const id = deckArchtypes[i]._id; //Get the id of the object
        await page.goto(`${url}`); //Go to the deck archtype url
        //Where we are going to get the urls for the decks
        decksUrl[i] = await page.evaluate( () => {
            const results = [];
            const mainUrl = 'https://www.mtgtop8.com/';
            const selection = document.querySelector('td:nth-child(2) > form > table > tbody  td:nth-child(2) > a');//The query selector for the deck url element
            //const percent = document.querySelectorAll('div:nth-child(2) > div:nth-child(2) > div:nth-child(1)');
            results.push(
                    mainUrl + selection.getAttribute('href') //Saves the url link of the deck archetype
            );
            return results;
        })
        const filter = {'_id': new Object(`${id}`)}; //This is going to filter the update to the id of the deck url we want to change
        const update = {'url': `${deckUrl[i][0]}`}; //The url we want to change
        const change = await Deck.updateOne({filter, update}); //This does the update
    }
}


module.exports = {start, deckUrl};

