# MTG API

![plot]("C:\Users\BunnySoo\Pictures\Saved Pictures\black_lotus.jpg")

Hello, this project entails me making a web scrapper for the website MTG Top 8. 
The data being scrapped is 1 deck of each named in the formats of Standard, Modern, Vintage, and Legacy.
Finally a web api is going to be created to allow users to fetch the data.

UPDATE: I was able to scrape for the formats explorer, historic, pioneer, and pauper. (2/17/2023)

Future goals: 
    1) Add a couple of more formats
    2) Allow the user to select the different versions of each format 
        Ex. Standard has multiple different metagame breakdowns for different time periods such as Last 2 months, Last 2 weeks, etc. Currently right now the way I have it set up is that the first option is shown, so the goal would be to allow the user to select which time period they want.
    3) Make specific api routes that allow users to select how many decks they want in the chosen format
    4) Make specific api routes that allow users to chose a specific deck they want in a given format
    5) Make a function that allows a user to enter a deck name, event, or player no matter what format it is
        Explanation: This could be done with the search page in mtgtop8 website. The website allows for people to search for event, deck, or player no matter the format. Just got to learn how to type into forms in puppeeter.
    6) Either deploy this in a free api service or figure out how to make this into an npm package (might just do both if push comes to shove).   
