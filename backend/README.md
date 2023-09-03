# MTG API

![black_lotus](https://user-images.githubusercontent.com/73848683/219573928-da183629-6df6-42bf-8777-35fc038c12d8.jpg)

### Introduction
Hello, this project entails me making a web scrapper for the website MTG Top 8.
The website entails a list of the current meta decks used in the different game modes in the popular trading card game, Magic the Gathering (**Note that I am going to call these game modes formats from here on out**). 
The data being scrapped is a list of meta decks in the formats of Standard, Modern, Vintage, Legacy, Canadian Highlander, Alchemy,
Block, Duel Commander, Explorer, Extended, Highlander, Historic, Pauper, Peasant, and Pioneer. (**cEDH web scrapper doesn't work currently without the need of a database to store the information. Look at the github for a guideline on how to create your own version**)

### Installation
npm install mtg_meta_decks

### How to use this library
This library is separated by each of the formats, so if a user wants to access a specific format such as this:
```ts
const deck = require('mtg_meta_decks');

async function start(){
    let check = await deck.historic.historic();
    console.log(check);
}
start();
```
Simply replace historic for the format that you want and historic() for the function that you want to use in the historic file.

### Formats and their functions
Each format in the website mtgtop8.com has different versions that a user can access. That is why most of the files in this library have 2 functions to access the data in a given format, one for a default version if you don't care, and one where you can specify which version that you want. 
**Some formats have versions that simply didn't have enough information that I couldn't add it to the list. If this changes please send a github issue or a pull request so that I can fix it.**
Below you will see a list of all of the formats with links to there functions and the list of versions that are available. **I will in the future add links to each version for the user to be able to see it in the original website.**

- [Alchemy](###Installation)
- [Block]
