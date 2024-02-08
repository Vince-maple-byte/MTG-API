const puppeteer = require('puppeteer');
const urlMap = new Map();
urlMap.set('last4Months', "https://www.mtgtop8.com/format?f=VI")
urlMap.set('last2Months', "https://www.mtgtop8.com/format?f=VI&meta=82&a=")
urlMap.set('liveTournaments', "https://www.mtgtop8.com/format?f=VI&meta=83&a=")
urlMap.set('all2023Decks', "https://www.mtgtop8.com/format?f=VI&meta=244&a=")
urlMap.set('all2022Decks', "https://www.mtgtop8.com/format?f=VI&meta=238&a=")
urlMap.set('all2021to2020Decks', "https://www.mtgtop8.com/format?f=VI&meta=221&a=")
urlMap.set('all2019to2018Decks', "https://www.mtgtop8.com/format?f=VI&meta=167&a=")
urlMap.set('all2017to2015Decks', "https://www.mtgtop8.com/format?f=VI&meta=148&a=")
urlMap.set('all2014to2011Decks', "https://www.mtgtop8.com/format?f=VI&meta=15&a=")
urlMap.set('allMajorEvents', "https://www.mtgtop8.com/format?f=VI&meta=40&a=")
urlMap.set('allDecks', "https://www.mtgtop8.com/format?f=VI&meta=14&a=")

async function vintage(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.mtgtop8.com/format?f=EX");

    
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
            format: 'allDecks',
            deckName: deckArchtypes[index].deckName, //Saves the deck archetype name 
            deckImage: deckImage[index],
            deckPercentage: deckPercentage[index],
            url: oneDeckUrl[index], //Deck link
            cards: cards[index] // Cards
        }
    }
    
    await browser.close();
    return finalDeck;
}

async function vintageFormat(format){
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
                deckImage: deckImage[index],
                deckPercentage: deckPercentage[index],
                url: oneDeckUrl[index], //Deck link
                cards: cards[index] // Cards
            }
        }

        await browser.close();
        return finalDeck;
    }
}
module.exports = {vintage, vintageFormat};
