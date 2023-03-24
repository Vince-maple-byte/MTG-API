const puppeteer = require('puppeteer');
const urlMap = new Map();
urlMap.set(
   'last2Months', "https://www.mtgtop8.com/format?f=LE",
   'last2weeks', "https://www.mtgtop8.com/format?f=LE&meta=34&a=",
   'majorEvents4months', "https://www.mtgtop8.com/format?f=LE&meta=188&a=",
   'liveTournaments', "https://www.mtgtop8.com/format?f=LE&meta=72&a=",
   'all2023Decks', "https://www.mtgtop8.com/format?f=LE&meta=245&a=",
   'all2022Decks', "https://www.mtgtop8.com/format?f=LE&meta=237&a=",
   'all2021Decks', "https://www.mtgtop8.com/format?f=LE&meta=219&a=",
   'all2020Decks', "https://www.mtgtop8.com/format?f=LE&meta=199&a=",
   'all2019Decks', "https://www.mtgtop8.com/format?f=LE&meta=182&a=",
   'all2018Decks', "https://www.mtgtop8.com/format?f=LE&meta=164&a=",
   'all2017Decks', "https://www.mtgtop8.com/format?f=LE&meta=143&a=",
   'all2016Decks', "https://www.mtgtop8.com/format?f=LE&meta=117&a=",
   'all2015Decks', "https://www.mtgtop8.com/format?f=LE&meta=100&a=",
   'all2014Decks', "https://www.mtgtop8.com/format?f=LE&meta=81&a=",
   'all2013Decks', "https://www.mtgtop8.com/format?f=LE&meta=80&a=",
   'all2012Decks', "https://www.mtgtop8.com/format?f=LE&meta=6&a=",
   'all2011Decks', "https://www.mtgtop8.com/format?f=LE&meta=61&a=",
   'majorEventsDecks', "https://www.mtgtop8.com/format?f=LE&meta=27&a=",
   'allDecks', "https://www.mtgtop8.com/format?f=LE&meta=16&a="
)

async function legacy(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlMap.get('last2Months'));
    
    /*Have to extract all of the links for each deck archtype in standard and save it in a JSON object
    Don't forget to add the main url to the url saved in the json data when sending it out
    Ex. https://www.mtgtop8.com/ + url
    They all share the class name S14(Complete)
    */
    let deckArchtypes = await page.evaluate( () => {
        const results = [];
        const mainUrl = 'https://www.mtgtop8.com/';
        const item = document.querySelectorAll('td:nth-child(1) div.S14 > a');
        item.forEach(element => {
            results.push({
                deckName:  element.textContent, //Saves the deck archetype name 
                url: mainUrl + element.getAttribute('href') //Saves the url link of the deck archetype
            });
        });
        return results;
    });

    // Next step click each deckArchetype and save the first link of the deck shown (Completed)
    let deckArchetypeUrl = []
    for (let index = 0; index < deckArchtypes.length; index++) {
        deckArchetypeUrl.push(deckArchtypes[index].url);
        
    }

    //This solves the issue of getting the links to each individual deck
    //Might only do one deck for each archetype since this is kind of overkill and could problem run into issues with server timing in the future.
    let decksUrl = [];
    for (let i = 0; i < deckArchetypeUrl.length; i++) {
        const url = deckArchetypeUrl[i];
        await page.goto(`${url}`);
        decksUrl[i] = await page.evaluate( () => {
            const results = [];
            const mainUrl = 'https://www.mtgtop8.com/';
            const item = document.querySelectorAll('td:nth-child(2) > form:nth-child(1) > table > tbody  td:nth-child(2) > a');
            //const percent = document.querySelectorAll('div:nth-child(2) > div:nth-child(2) > div:nth-child(1)');
            item.forEach(element => {
                results.push(
                     mainUrl + element.getAttribute('href') //Saves the url link of the deck archetype
                );
            });
            return results;
        })
    }
    
    //This creates only one deck link for each deck archetype(Complete)
    let oneDeckUrl = new Array(decksUrl.length);
    for (let index = 0; index < decksUrl.length; index++) {
        if(decksUrl[index] == undefined){
            oneDeckUrl[index] = "No Deck Available";
        }else{
            oneDeckUrl[index] = decksUrl[index][0]; //If I want all of the decks in the first page all I need to do is eliminate the [0]
        }
        
    }

    //Save the cards in an array with the number of each card in the deck(Complete)
    let cards = [];
    for (let i = 0; i < oneDeckUrl.length; i++) {
        const url = oneDeckUrl[i];
        await page.goto(`${url}`);
        cards[i] = await page.evaluate( () => {
            const results = [];
            //const mainUrl = 'https://www.mtgtop8.com/';
            const number = document.querySelectorAll('.deck_line.hover_tr');
            number.forEach(element => {
                results.push(
                    element.textContent //Saves all of the cards with the amount in the deck
                );
            });
            return results;
        })
    }

    //Final array with the deckName, deckUrl, and the cards all in one
    let finalDeck = [];
    for(let index = 0; index < oneDeckUrl.length; index++){
        finalDeck[index] = {
            format: 'last2Months',
            deckName: deckArchtypes[index].deckName, //Saves the deck archetype name 
            url: oneDeckUrl[index], //Deck link
            cards: cards[index] // Cards
        }
    }

    

    await browser.close();
    return finalDeck;
}

async function legacyFormat(format){
    if(!(urlMap.has(`${format}`))){
        return 'Select the correct legacy format to view the decks';
    }
    else{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urlMap.get(`${format}`));
        
        /*Have to extract all of the links for each deck archtype in standard and save it in a JSON object
        Don't forget to add the main url to the url saved in the json data when sending it out
        Ex. https://www.mtgtop8.com/ + url
        They all share the class name S14(Complete)
        */
        let deckArchtypes = await page.evaluate( () => {
            const results = [];
            const mainUrl = 'https://www.mtgtop8.com/';
            const item = document.querySelectorAll('td:nth-child(1) div.S14 > a');
            item.forEach(element => {
                results.push({
                    deckName:  element.textContent, //Saves the deck archetype name 
                    url: mainUrl + element.getAttribute('href') //Saves the url link of the deck archetype
                });
            });
            return results;
        });
    
        // Next step click each deckArchetype and save the first link of the deck shown (Completed)
        let deckArchetypeUrl = []
        for (let index = 0; index < deckArchtypes.length; index++) {
            deckArchetypeUrl.push(deckArchtypes[index].url);
            
        }
    
        //This solves the issue of getting the links to each individual deck
        //Might only do one deck for each archetype since this is kind of overkill and could problem run into issues with server timing in the future.
        let decksUrl = [];
        for (let i = 0; i < deckArchetypeUrl.length; i++) {
            const url = deckArchetypeUrl[i];
            await page.goto(`${url}`);
            decksUrl[i] = await page.evaluate( () => {
                const results = [];
                const mainUrl = 'https://www.mtgtop8.com/';
                const item = document.querySelectorAll('td:nth-child(2) > form:nth-child(1) > table > tbody  td:nth-child(2) > a');
                //const percent = document.querySelectorAll('div:nth-child(2) > div:nth-child(2) > div:nth-child(1)');
                item.forEach(element => {
                    results.push(
                         mainUrl + element.getAttribute('href') //Saves the url link of the deck archetype
                    );
                });
                return results;
            })
        }
        
        //This creates only one deck link for each deck archetype(Complete)
        let oneDeckUrl = new Array(decksUrl.length);
        for (let index = 0; index < decksUrl.length; index++) {
            if(decksUrl[index] == undefined){
                oneDeckUrl[index] = "No Deck Available";
            }else{
                oneDeckUrl[index] = decksUrl[index][0]; //If I want all of the decks in the first page all I need to do is eliminate the [0]
            }
            
        }
    
        //Save the cards in an array with the number of each card in the deck(Complete)
        let cards = [];
        for (let i = 0; i < oneDeckUrl.length; i++) {
            const url = oneDeckUrl[i];
            await page.goto(`${url}`);
            cards[i] = await page.evaluate( () => {
                const results = [];
                //const mainUrl = 'https://www.mtgtop8.com/';
                const number = document.querySelectorAll('.deck_line.hover_tr');
                number.forEach(element => {
                    results.push(
                        element.textContent //Saves all of the cards with the amount in the deck
                    );
                });
                return results;
            })
        }
    
        //Final array with the deckName, deckUrl, and the cards all in one
        let finalDeck = [];
        for(let index = 0; index < oneDeckUrl.length; index++){
            finalDeck[index] = {
                format: `${format}`,
                deckName: deckArchtypes[index].deckName, //Saves the deck archetype name 
                url: oneDeckUrl[index], //Deck link
                cards: cards[index] // Cards
            }
        }
    
        
    
        await browser.close();
        return finalDeck;
    }
}
module.exports = {legacy, legacyFormat};