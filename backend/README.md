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

- [Alchemy](###Alchemy)
- [Block](###Block)
- [Canadian Highlander](###Canadian-Highlander)
- [Duel Commander](###Duel-Commander)
- [Explorer](###Explorer)
- [Extended](###Extended)
- [Highlander](###Highlander)
- [Historic](###Historic)
- [Legacy](###Legacy)
- [Modern](###Modern)
- [Pauper](###Pauper)
- [Peasant](###Peasant)
- [Pioneer](###Pioneer)
- [Standard](###Standard)
- [Vintage](###Vintage)


<!-- Do the rest of this tommorrow and I am done -->
### Alchemy
**Functions available:** 
    {Default} alchemy()
**Format Versions:** 
    {Default} *All Alchemy Decks* (https://www.mtgtop8.com/format?f=ALCH) 

### Block
**Functions available:** 
    {Default} block()
    {Format Version} blockFormat(format)
**Format Versions:** 
    {Default Version} *khanBlock*: (https://www.mtgtop8.com/format?f=BL)
    *otherBlockEvents*: (https://www.mtgtop8.com/format?f=BL&meta=229&a=)
    *therosBlock*: (https://www.mtgtop8.com/format?f=BL&meta=68&a=)
    *returnToRavnicaBlock*: (https://www.mtgtop8.com/format?f=BL&meta=60&a=)
    *innistradBlock*: (https://www.mtgtop8.com/format?f=BL&meta=17&a=)
    *scarsBlock*: (https://www.mtgtop8.com/format?f=BL&meta=18&a=)
    *allPT*: (https://www.mtgtop8.com/format?f=BL&meta=93&a=)


### Canadian Highlander
**Functions available:** 
    {Default} canadianHighlander().
**Format Versions:** 
    {Default} *All Canadian Highlander Decks* (https://www.mtgtop8.com/format?f=CHL) 

### Duel Commander
**Functions available:** 
    {Default} duelCommander()
    duelCommanderFormat(format)
**Format Versions:** 
    {Default} *last3Months* (https://www.mtgtop8.com/format?f=EDH)
    *lastMonths*: (https://www.mtgtop8.com/format?f=EDH&meta=115&a=)
    *lastMajorEvents*: (https://www.mtgtop8.com/format?f=EDH&meta=130&a=)
    *last12Months*: (https://www.mtgtop8.com/format?f=EDH&meta=209&a=)
    *all2023Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=252&a=)
    *all2022Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=233&a=)
    *all2021Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=216&a=)
    *all2020Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=198&a=)
    *all2019Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=181&a=)
    *all2018Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=166&a=)
    *all2017Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=146&a=)
    *all2016Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=122&a=)
    *all2015Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=99&a=)
    *all2014Decks*: (https://www.mtgtop8.com/format?f=EDH&meta=129&a=)
    *majorEvents*: (https://www.mtgtop8.com/format?f=EDH&meta=196&a=)
    *allCommanderDecks*: https://www.mtgtop8.com/format?f=EDH&meta=56&a=);

### Explorer
**Functions available:** 
    last4Months()
    allExplorerDecks()
**Format Versions:**
    *last4Months*: (https://www.mtgtop8.com/format?f=EXP)
    *allExplorerDecks*: (https://www.mtgtop8.com/format?f=EXP&meta=243&a=)

### Extended
**Functions available:** 
    {Default} extended()
    extendedFormat(format)
**Format Versions:** 
    {Default} *allDecks*: (https://www.mtgtop8.com/format?f=EX)
    *lorwyn*: (https://www.mtgtop8.com/format?f=EX&meta=20&a=)
    *timeSpiral*: (https://www.mtgtop8.com/format?f=EX&meta=112&a=)
    *mirrodin*: (https://www.mtgtop8.com/format?f=EX&meta=111&a=)
    *onSlaught*: (https://www.mtgtop8.com/format?f=EX&meta=21&a=)
    *invasion*: (https://www.mtgtop8.com/format?f=EX&meta=23&a=)
    *tempest*: (https://www.mtgtop8.com/format?f=EX&meta=7&a=)
    *iceAge*: (https://www.mtgtop8.com/format?f=EX&meta=41&a=)
    *allPT*: (https://www.mtgtop8.com/format?f=EX&meta=94&a=)

### Highlander
**Functions available:** 
    {Default} highlander()
    highlanderFormat(format)
**Format Versions:** 
    {Default} *last24Months*: (https://www.mtgtop8.com/format?f=HIGH)
    *allDecks2014to2017*: (https://www.mtgtop8.com/format?f=HIGH&meta=90&a=)
    *allDecks2005to2013*: (https://www.mtgtop8.com/format?f=HIGH&meta=89&a=)
    *allHighlanderDecks*: (https://www.mtgtop8.com/format?f=HIGH&meta=88&a=)
    *allGP*: (https://www.mtgtop8.com/format?f=HIGH&meta=116&a=)

### Historic
**Functions available:** 
    {Default} historic()
    historicFormat(format)
**Format Versions:** 
    {Default} *last2Months*:(https://www.mtgtop8.com/format?f=HI)
    *all2023Decks*:(https://www.mtgtop8.com/archetype?f=HI&meta=248&a=971)
    *all2022Decks*:(https://www.mtgtop8.com/archetype?f=HI&meta=234&a=971)
    *all2021Decks*:(https://www.mtgtop8.com/archetype?f=HI&meta=218&a=971)
    *allHistoricDecks*:(https://www.mtgtop8.com/archetype?f=HI&meta=215&a=971)

### Legacy
**Functions available:** 
    {Default} legacy()
    legacyFormat(format)
**Format Versions:** 
    {Default} *last2Months*: (https://www.mtgtop8.com/format?f=LE)
    *majorEvents4months*: (https://www.mtgtop8.com/format?f=LE&meta=188&a=)
    *liveTournaments*: (https://www.mtgtop8.com/format?f=LE&meta=72&a=)
    *all2023Decks*: (https://www.mtgtop8.com/format?f=LE&meta=245&a=)
    *all2022Decks*: (https://www.mtgtop8.com/format?f=LE&meta=237&a=)
    *all2021Decks*: (https://www.mtgtop8.com/format?f=LE&meta=219&a=)
    *all2020Decks*: (https://www.mtgtop8.com/format?f=LE&meta=199&a=)
    *all2019Decks*: (https://www.mtgtop8.com/format?f=LE&meta=182&a=)
    *all2018Decks*: (https://www.mtgtop8.com/format?f=LE&meta=164&a=)
    *all2017Decks*: (https://www.mtgtop8.com/format?f=LE&meta=143&a=)
    *all2016Decks*: (https://www.mtgtop8.com/format?f=LE&meta=117&a=)
    *all2015Decks*: (https://www.mtgtop8.com/format?f=LE&meta=100&a=)
    *all2014Decks*: (https://www.mtgtop8.com/format?f=LE&meta=81&a=)
    *all2013Decks*: (https://www.mtgtop8.com/format?f=LE&meta=80&a=)
    *all2012Decks*: (https://www.mtgtop8.com/format?f=LE&meta=6&a=)
    *all2011Decks*: (https://www.mtgtop8.com/format?f=LE&meta=61&a=)
    *majorEventsDecks*: (https://www.mtgtop8.com/format?f=LE&meta=27&a=)
    *allDecks*: (https://www.mtgtop8.com/format?f=LE&meta=16&a=)

### Modern
**Functions available:** 
    {Default} modern()
    modernFormat(format)
**Format Versions:** 
    {Default} *last2Months*: (https://www.mtgtop8.com/format?f=MO)
    *last2Weeks*: (https://www.mtgtop8.com/format?f=MO&meta=54&a=)
    *lastMajorEvents*: (https://www.mtgtop8.com/format?f=MO&meta=57&a=)
    *liveTournaments*: (https://www.mtgtop8.com/format?f=MO&meta=57&a=)
    *all2023Decks*: (https://www.mtgtop8.com/format?f=MO&meta=246&a=)
    *all2022Decks*: (https://www.mtgtop8.com/format?f=MO&meta=236&a=)
    *all2021Decks*: (https://www.mtgtop8.com/format?f=MO&meta=220&a=)
    *all2020Decks*: (https://www.mtgtop8.com/format?f=MO&meta=200&a=)
    *all2019Decks*: (https://www.mtgtop8.com/format?f=MO&meta=183&a=)
    *all2018Decks*: (https://www.mtgtop8.com/format?f=MO&meta=163&a=)
    *all2017Decks*: (https://www.mtgtop8.com/format?f=MO&meta=142&a=)
    *all2016Decks*: (https://www.mtgtop8.com/format?f=MO&meta=118&a=)
    *all2015Decks*: (https://www.mtgtop8.com/format?f=MO&meta=101&a=)
    *all2014Decks*: (https://www.mtgtop8.com/archetype?f=MO&meta=79&a=189)
    *all2013Decks*: (https://www.mtgtop8.com/archetype?f=MO&meta=77&a=189)
    *all2012Decks*: (https://www.mtgtop8.com/archetype?f=MO&meta=76&a=189)
    *all2011Decks*: (https://www.mtgtop8.com/format?f=MO&meta=78&a=)
    *allModernDecks*: (https://www.mtgtop8.com/format?f=MO&meta=44&a=)
    *allPt*: (https://www.mtgtop8.com/format?f=MO&meta=92&a=)

### Pauper
**Functions available:** 
    {Default} pauper()
    pauperFormat(format)
**Format Versions:** 
    {Default} *last2Months*: (https://www.mtgtop8.com/format?f=PAU)
    *last4Months*: (https://www.mtgtop8.com/format?f=PAU&meta=127&a=)
    *liveTournaments*: (https://www.mtgtop8.com/format?f=PAU&meta=185&a=)
    *all2023Decks*: (https://www.mtgtop8.com/format?f=PAU&meta=251&a=)
    *all2022Decks*: (https://www.mtgtop8.com/format?f=PAU&meta=239&a=)
    *all2021Decks*: (https://www.mtgtop8.com/format?f=PAU&meta=224&a=)
    *all2020Decks*: (https://www.mtgtop8.com/format?f=PAU&meta=223&a=)
    *all2019Decks*: (https://www.mtgtop8.com/format?f=PAU&meta=186&a=)
    *all2018Decks*: (https://www.mtgtop8.com/format?f=PAU&meta=170&a=)
    *all2017Decks*: (https://www.mtgtop8.com/format?f=PAU&meta=169&a=)
    *all2016Decks*: (https://www.mtgtop8.com/format?f=PAU&meta=168&a=)
    *allPauperDecks*: (https://www.mtgtop8.com/format?f=PAU&meta=110&a=)

### Peasant
**Functions available:** 
    {Default} peasant()
    peasantFormat(format)
**Format Versions:** 
    {Default} *allPeasantDecks*: (https://www.mtgtop8.com/format?f=PEA&meta=205&a=)
    *banlistE7*: (https://www.mtgtop8.com/format?f=PEA&meta=225&a=)
    *banlistE6toE5*: (https://www.mtgtop8.com/format?f=PEA&meta=207&a=)
    *banlistE4*: (https://www.mtgtop8.com/format?f=PEA&meta=179&a=)
    *banlistE3*: (https://www.mtgtop8.com/format?f=PEA&meta=124&a=)
    *banlistE2*: (https://www.mtgtop8.com/format?f=PEA&meta=151&a=)
    *banlistE1*: (https://www.mtgtop8.com/format?f=PEA&meta=150&a=)

### Pioneer
**Functions available:** 
    {Default} pioneer()
    pioneerFormat(format)
**Format Versions:** 
    {Default} *last2Months*: (https://www.mtgtop8.com/format?f=PI)
    *last2Weeks*: (https://www.mtgtop8.com/format?f=PI&meta=194&a=)
    *all2023Decks*: (https://www.mtgtop8.com/format?f=PI&meta=247&a=)
    *all2022Decks*: (https://www.mtgtop8.com/format?f=PI&meta=235&a=)
    *all2021Decks*: (https://www.mtgtop8.com/format?f=PI&meta=222&a=)
    *all2020Decks*: (https://www.mtgtop8.com/format?f=PI&meta=202&a=)
    *all2019Decks*: (https://www.mtgtop8.com/format?f=PI&meta=201&a=)
    *allPioneer*: (https://www.mtgtop8.com/format?f=PI&meta=191&a=)

### Standard
**Functions available:** 
    {Default} standard()
    standardFormat(format)
**Format Versions:** 
    {Default} *standardLast2Months*: (https://www.mtgtop8.com/format?f=ST)
    *standardLast2Weeks*: (https://www.mtgtop8.com/format?f=ST&meta=50&a=)
    *standardLargeEventsLast2Months*: (https://www.mtgtop8.com/format?f=ST&meta=46&a=)
    *standardPlayersTourOnline*: (https://www.mtgtop8.com/format?f=ST&meta=210&a=)
    *standardAll2023Decks*: (https://www.mtgtop8.com/format?f=ST&meta=250&a=)
    *standardAll2022Decks*: (https://www.mtgtop8.com/format?f=ST&meta=249&a=)
    *standard2020to2021*: (https://www.mtgtop8.com/format?f=ST&meta=217&a=)
    *standard2018To2019*: (https://www.mtgtop8.com/format?f=ST&meta=175&a=)
    *standard2019To2020*: (https://www.mtgtop8.com/format?f=ST&meta=187&a=)
    *standard2017To2018*:(https://www.mtgtop8.com/format?f=ST&meta=161&a=)
    *standard2016To2017*: (https://www.mtgtop8.com/format?f=ST&meta=128&a=)
    *standard2015To2016*: (https://www.mtgtop8.com/format?f=ST&meta=133&a=)
    *standard2014To2015*: (https://www.mtgtop8.com/archetype?f=ST&meta=114&a=12)
    *standard2013To2014*: (https://www.mtgtop8.com/archetype?f=ST&meta=86&a=12)
    *standard2012To2013*: (https://www.mtgtop8.com/archetype?f=ST&meta=75&a=12)
    *standard2011To2012*: (https://www.mtgtop8.com/archetype?f=ST&meta=74&a=12)
    *standard2010To2011*: (https://www.mtgtop8.com/archetype?f=ST&meta=45&a=12)
    *allStandard*: (https://www.mtgtop8.com/archetype?f=ST&meta=58&a=12)
    *allWorlds*: (https://www.mtgtop8.com/archetype?f=ST&meta=97&a=12)
    *allProTour*: (https://www.mtgtop8.com/archetype?f=ST&meta=91&a=12)
    *allGrandPrix*: (https://www.mtgtop8.com/archetype?f=ST&meta=96&a=12)

### Vintage
**Functions available:** 
    {Default} vintage()
    vintageFormat(format)
**Format Versions:** 
    {Default} *last4Months*: (https://www.mtgtop8.com/format?f=VI)
    *last2Months*: (https://www.mtgtop8.com/format?f=VI&meta=82&a=)
    *liveTournaments*: (https://www.mtgtop8.com/format?f=VI&meta=83&a=)
    *all2023Decks*: (https://www.mtgtop8.com/format?f=VI&meta=244&a=)
    *all2022Decks*: (https://www.mtgtop8.com/format?f=VI&meta=238&a=)
    *all2021to2020Decks*: (https://www.mtgtop8.com/format?f=VI&meta=221&a=)
    *all2019to2018Decks*: (https://www.mtgtop8.com/format?f=VI&meta=167&a=)
    *all2017to2015Decks*: (https://www.mtgtop8.com/format?f=VI&meta=148&a=)
    *all2014to2011Decks*: (https://www.mtgtop8.com/format?f=VI&meta=15&a=)
    *allMajorEvents*: (https://www.mtgtop8.com/format?f=VI&meta=40&a=)
    *allDecks*: (https://www.mtgtop8.com/format?f=VI&meta=14&a=)

Github project link: https://github.com/Vince-maple-byte/MTG-API
Npm package: https://www.npmjs.com/package/mtg_meta_decks?activeTab=readme