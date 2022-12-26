const puppeteer = require('puppeteer');


async function start(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.mtgtop8.com/format?f=ST");
    
    /*Have to extract all of the links for each deck archtype in standard and save it in a JSON object
    Don't forget to add the main url to the url saved in the json data when sending it out
    Ex. https://www.mtgtop8.com/ + url
    They all share the class name S14
    */
    let deckArchtypes = await page.evaluate( () => {
        const results = [];
        const mainUrl = 'https://www.mtgtop8.com/';
        const item = document.querySelectorAll('div.S14 > a[href] ');
        item.forEach(element => {
            results.push({
                deckName:  element.textContent, //Saves the deck archetype name 
                url: mainUrl + element.getAttribute('href') //Saves the url link of the deck archetype
            });
        });
        return results;
    });

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