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
    
    await console.log(deckArchtypes);
    //await console.log(deckPopularity);

    await browser.close();
}

start();