const puppeteer = require('puppeteer');
const urlMap = new Map();
urlMap.set('last3Months', "https://www.mtgtop8.com/format?f=EDH")
urlMap.set('lastMonths', "https://www.mtgtop8.com/format?f=EDH&meta=115&a=");
urlMap.set('lastMajorEvents', "https://www.mtgtop8.com/format?f=EDH&meta=130&a=");
urlMap.set('last12Months', "https://www.mtgtop8.com/format?f=EDH&meta=209&a=");
urlMap.set('all2023Decks', "https://www.mtgtop8.com/format?f=EDH&meta=252&a=");
urlMap.set('all2022Decks', "https://www.mtgtop8.com/format?f=EDH&meta=233&a=");
urlMap.set('all2021Decks', "https://www.mtgtop8.com/format?f=EDH&meta=216&a=");
urlMap.set('all2020Decks', "https://www.mtgtop8.com/format?f=EDH&meta=198&a=");    
urlMap.set('all2019Decks', "https://www.mtgtop8.com/format?f=EDH&meta=181&a=");  
urlMap.set('all2018Decks', "https://www.mtgtop8.com/format?f=EDH&meta=166&a=");    
urlMap.set('all2017Decks', "https://www.mtgtop8.com/format?f=EDH&meta=146&a=");    
urlMap.set('all2016Decks', "https://www.mtgtop8.com/format?f=EDH&meta=122&a=");    
urlMap.set('all2015Decks', "https://www.mtgtop8.com/format?f=EDH&meta=99&a=");   
urlMap.set('all2014Decks', "https://www.mtgtop8.com/format?f=EDH&meta=129&a=");    
urlMap.set('majorEvents', "https://www.mtgtop8.com/format?f=EDH&meta=196&a=");
urlMap.set('allCommanderDecks', "https://www.mtgtop8.com/format?f=EDH&meta=56&a=");
module.exports = {duelCommander, duelCommanderFormat};

async function duelCommander(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.mtgtop8.com/format?f=EDH");
    
    /*Have to extract all of the links for each deck archtype in standard and save it in a JSON object
    Don't forget to add the main url to the url saved in the json data when sending it out
    Ex. https://www.mtgtop8.com/ + url
    They all share the class name S14
    */
    let deckArchtypes = await page.evaluate( () => {
        const results = [];
        const mainUrl = 'https://www.mtgtop8.com/';
        const item = document.querySelectorAll('td:nth-child(1) div.S14 > a');
        //const percent = document.querySelectorAll('div:nth-child(2) > div:nth-child(2) > div:nth-child(1)');
        item.forEach(element => {
            results.push({
                deckName:  element.textContent, //Saves the deck archetype name 
                url: mainUrl + element.getAttribute('href') //Saves the url link of the deck archetype
            });
        });
        return results;
    });

    let deckImage = await page.evaluate( () => {
        const results = [];
        const mainUrl = 'https://www.mtgtop8.com/';
        const item = document.querySelectorAll('tr > td > div.hover_tr > div > div:first-child > img')
        item.forEach(element => {
            results.push(
                mainUrl + element.getAttribute('src') //Saves the deck archetype image 
            );
        });
        
        return results;
    });

    let deckPercentage = await page.evaluate( () => {
        const results = [];
        const item = document.querySelectorAll(
            'tr > td > div.hover_tr > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)'
            ) // Query for getting the percentage of popularity in a deck archetype
        item.forEach(element => {
            results.push(
                element.textContent //Saves the percentage of popularity in a deck archetype 
            );
        });
        
        return results;
    });

    //This solves the issue of getting the links to each individual deck
    //Might only do one deck for each archetype since this is kind of overkill and could run into issues with server timing in the future.
    let decksUrl = [];
    for (let i = 0; i < deckArchtypes.length; i++) {
        const url = deckArchtypes[i].url;
        await page.goto(`${url}`);
        decksUrl[i] = await page.evaluate( () => {
            const results = [];
            const mainUrl = 'https://www.mtgtop8.com/';
            const item = document.querySelectorAll('td:nth-child(2) > form > table > tbody  td:nth-child(2) > a');
            //const percent = document.querySelectorAll('div:nth-child(2) > div:nth-child(2) > div:nth-child(1)');
            console.log(item.getAttribute)
            item.forEach(element => {
                results.push(
                     mainUrl + element.getAttribute('href') //Saves the url link of the deck archetype
                );
            });
            return results;
        })
    }
    

    //Save the cards in an array with the number of each card in the deck(Complete)
    let cards = [];
    for (let i = 0; i < decksUrl.length; i++) {
        const url = decksUrl[i][0];
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
    for(let index = 0; index < decksUrl.length; index++){
        finalDeck[index] = {
            format: 'last3Months',
            deckName: deckArchtypes[index].deckName, //Saves the deck archetype name
            deckImage: deckImage[index], //Deck Image
            deckPercentage: deckPercentage[index],
            url: decksUrl[index][0], //Deck link
            cards: cards[index] // Cards
        }
    }

    await browser.close();
    return finalDeck;
}

async function duelCommanderFormat(format){
    if(!(urlMap.has(`${format}`))){
        return 'Select the correct vintage format to view the decks';
    }
    else{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urlMap.get(`${format}`));
        
        /*Have to extract all of the links for each deck archtype in standard and save it in a JSON object
        Don't forget to add the main url to the url saved in the json data when sending it out
        Ex. https://www.mtgtop8.com/ + url
        They all share the class name S14
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

        let deckImage = await page.evaluate( () => {
            const results = [];
            const mainUrl = 'https://www.mtgtop8.com/';
            const item = document.querySelectorAll('tr > td > div.hover_tr > div > div:first-child > img')
            item.forEach(element => {
                results.push(
                    mainUrl + element.getAttribute('src') //Saves the deck archetype image 
                );
            });
            
            return results;
        });
    
        let deckPercentage = await page.evaluate( () => {
            const results = [];
            const item = document.querySelectorAll(
                'tr > td > div.hover_tr > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)'
                ) // Query for getting the percentage of popularity in a deck archetype
            item.forEach(element => {
                results.push(
                    element.textContent //Saves the percentage of popularity in a deck archetype 
                );
            });
            
            return results;
        });

        // Next step click each deckArchetype and save the first link of the deck shown
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
                deckImage: deckImage[index], //Deck Image
                deckPercentage: deckPercentage[index], 
                url: oneDeckUrl[index], //Deck link
                cards: cards[index] // Cards
            }
        }

        await browser.close();
        return finalDeck;
    }
}
