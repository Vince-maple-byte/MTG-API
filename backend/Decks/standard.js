const puppeteer = require('puppeteer');

const urlMap = new Map();

urlMap.set('standardLast2Months', 'https://www.mtgtop8.com/format?f=ST')
urlMap.set('standardLast2Weeks', "https://www.mtgtop8.com/format?f=ST&meta=50&a=")
urlMap.set('standardLargeEventsLast2Months', "https://www.mtgtop8.com/format?f=ST&meta=46&a=")
urlMap.set('standardPlayersTourOnline', "https://www.mtgtop8.com/format?f=ST&meta=210&a=")
urlMap.set('standardAll2023Decks', "https://www.mtgtop8.com/format?f=ST&meta=250&a=")
urlMap.set('standardAll2022Decks', "https://www.mtgtop8.com/format?f=ST&meta=249&a=")
urlMap.set('standard2020to2021', "https://www.mtgtop8.com/format?f=ST&meta=217&a=")
urlMap.set('standard2018To2019', "https://www.mtgtop8.com/format?f=ST&meta=175&a=")
urlMap.set('standard2019To2020', "https://www.mtgtop8.com/format?f=ST&meta=187&a=")
urlMap.set('standard2017To2018',"https://www.mtgtop8.com/format?f=ST&meta=161&a=")
urlMap.set('standard2016To2017', "https://www.mtgtop8.com/format?f=ST&meta=128&a=")
urlMap.set('standard2015To2016', "https://www.mtgtop8.com/format?f=ST&meta=133&a=")
urlMap.set('standard2014To2015', "https://www.mtgtop8.com/archetype?f=ST&meta=114&a=12")
urlMap.set('standard2013To2014', "https://www.mtgtop8.com/archetype?f=ST&meta=86&a=12")
urlMap.set('standard2012To2013', "https://www.mtgtop8.com/archetype?f=ST&meta=75&a=12")
urlMap.set('standard2011To2012', "https://www.mtgtop8.com/archetype?f=ST&meta=74&a=12")
urlMap.set('standard2010To2011', "https://www.mtgtop8.com/archetype?f=ST&meta=45&a=12")
urlMap.set('allStandard', "https://www.mtgtop8.com/archetype?f=ST&meta=58&a=12")
urlMap.set('allWorlds', "https://www.mtgtop8.com/archetype?f=ST&meta=97&a=12")
urlMap.set('allProTour', "https://www.mtgtop8.com/archetype?f=ST&meta=91&a=12")
urlMap.set('allGrandPrix', "https://www.mtgtop8.com/archetype?f=ST&meta=96&a=12")

async function standard(){
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

async function standardFormat(format){
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

module.exports = {standard, standardFormat};