const puppeteer = require('puppeteer');

let mainUrl = 'https://www.mtgtop8.com/'
async function start(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.mtgtop8.com/format?f=MO");

    
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
    
    //This creates only one deck link for each deck archetype
    let oneDeckUrl = [];
    for (let index = 0; index < decksUrl.length; index++) {
        oneDeckUrl[index] = decksUrl[index][0];
        
    }
    console.log(oneDeckUrl);
    
    
    // Next step save all of the cards in the deck and make a new final json object with the deckName, cards, and the deck Url (the one that shows all of the cards)

    /*
    Tried to extract the deck popularity might do that later on.
    let deckPopularity = await page.evaluate( () => {
        const list = [];
        const items = document.querySelectorAll('');
        items.forEach(element => {
            list.push({
                //deckName:  element.getElementsByTagName('a').href,
                text: element.textContent
            });
        });
        return list;
    });
    */
    //await console.log(deckPopularity);

    await browser.close();
}

start();