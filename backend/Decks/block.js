const puppeteer = require('puppeteer');
const urlMap = new Map();
urlMap.set('khanBlock', 'https://www.mtgtop8.com/format?f=BL');
urlMap.set('otherBlockEvents', 'https://www.mtgtop8.com/format?f=BL&meta=229&a=');
urlMap.set('therosBlock', 'https://www.mtgtop8.com/format?f=BL&meta=68&a=');
urlMap.set('returnToRavnicaBlock', 'https://www.mtgtop8.com/format?f=BL&meta=60&a=');
urlMap.set('innistradBlock', 'https://www.mtgtop8.com/format?f=BL&meta=17&a=');
urlMap.set('scarsBlock', 'https://www.mtgtop8.com/format?f=BL&meta=18&a=');
urlMap.set('allPT', 'https://www.mtgtop8.com/format?f=BL&meta=93&a=');

async function block(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.mtgtop8.com/format?f=BL");

    
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
            format: 'khanBlock',
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

async function blockFormat(format){
    if(!(urlMap.has(`${format}`))){
        return 'Select the correct block format to view the decks ' + `${format}`;
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
module.exports = {block, blockFormat};