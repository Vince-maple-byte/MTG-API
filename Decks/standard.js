const puppeteer = require('puppeteer');

const urlMap = new Map();

urlMap.set('standardLast2Months', 'https://www.mtgtop8.com/format?f=ST')
urlMap.set('standardLast2Weeks', "https://www.mtgtop8.com/format?f=ST&meta=50&a=")
urlMap.set('standardLargeEventsLast2Months', "https://www.mtgtop8.com/format?f=ST&meta=46&a=")
urlMap.set('standardPlayersTourOnline', "https://www.mtgtop8.com/format?f=ST&meta=210&a=")
urlMap.set('standardAll2023Decks', "https://www.mtgtop8.com/format?f=ST&meta=250&a=")
urlMap.set('standardAll2022Decks', "https://www.mtgtop8.com/format?f=ST&meta=249&a=")
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
    await page.goto(urlMap.get('standardLast2Months'));
    
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
            format: 'standardLast2Months',
            deckName: deckArchtypes[index].deckName, //Saves the deck archetype name 
            url: decksUrl[index][0], //Deck link
            cards: cards[index] // Cards
        }
    }

    await browser.close();
    return finalDeck;
}

async function standardFormat(format){
    if(!(urlMap.has(format))){
        return "Select a proper standard format to view the decks"
    }
    else{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urlMap.get(format));
        
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
                format: `${format}`,
                deckName: deckArchtypes[index].deckName, //Saves the deck archetype name 
                url: decksUrl[index][0], //Deck link
                cards: cards[index] // Cards
            }
        }

        await browser.close();
        return finalDeck;
    }
    
}

module.exports = {standard, standardFormat};