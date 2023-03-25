# MTG API

![black_lotus](https://user-images.githubusercontent.com/73848683/219573928-da183629-6df6-42bf-8777-35fc038c12d8.jpg)

Hello, this project entails me making a web scrapper for the website MTG Top 8. 
The data being scrapped is 1 deck of each named in the formats of Standard, Modern, Vintage, and Legacy.
Finally a web api is going to be created to allow users to fetch the data.

UPDATE: I was able to scrape for the formats explorer, historic, pioneer, and pauper. (2/17/2023)
UPDATE: I was able to add all of the formats available from the website. The only format that I have 
trouble with is cEDH which most likely has to deal with how slow the web page itself is. (2/17/2023)
UPDATE: I was able to finish issue two, Some formats only had a limited amount of options that can be shown, so there is nothing we can do about that. I still need to figure out how to fix the cEDH format.(3/10/2023)

### Future goals: 

- [X] Issue 1: Add a couple of more formats (2/20/2023)
- [X] Issue 2: Allow the user to select the different versions of each format 
    Ex. Standard has multiple different metagame breakdowns for different time periods such as Last 2 months, Last 2 weeks, etc. Currently right now the way I have             it set up is that the first option is shown, so the goal would be to allow the user to select which time period they want.
- [ ] Issue 3: Format the api routes to be more cleaner with routes and middleware
- [ ] Issue 4: Make specific api routes that allow users to chose a specific deck they want in a given format
- [ ] Issue 5: Make a mongodb database to store all of the decks and make the api calls as needed.
- [ ] Issue 6: Either deploy this in a free api service or figure out how to make this into an npm package (might just do both if push comes to shove).   

