import React from "react";
import Card from "./Card.jsx";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import './CardSlider.css';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function CardSlider(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deck, setDeck] = useState();

    useEffect(() => {
        const fetchDeckData = async() => {
            try {
                let storedDeckData = sessionStorage.getItem('homePageDeck');

                if(!storedDeckData){
                    const standardDeck = await axios.get(
                        'http://localhost:3000/standard/standardLast2Months'
                    );
                    const standardCards = new Array();
                    for(let i = 0; i < standardDeck.data.length; i++){
                        standardCards.push(
                            standardDeck.data[i].cards.map((x) => x.substring(2, x.length-1))
                        );
                    }
                    const finalCards = await axios.post(
                        'http://localhost:3000/card/array/notALand',{
                            cards: standardCards[0]
                        }
                        
                    )
    
                    const homePageDeck = new Array();
    
                    for(let i = 0; i < 10; i++){
                        homePageDeck.push({
                            name: standardDeck.data[i].deckName,
                            img: finalCards.data[i].image_uris.art_crop
                        })
                    }
    
                    
                    console.log(homePageDeck);

                    //How we store data into the browser. 
                    //Session storage is temporary when the browser is closed
                    //JSON.stringify() converts a json object into a string so that we can send that data
                    sessionStorage.setItem('homePageDeck', JSON.stringify(homePageDeck));
    
                    setDeck(homePageDeck)
                }

                else{
                    //JSON.parse converts a string given (such as from a browser) and converts it to a JSON object
                    setDeck(JSON.parse(storedDeckData));
                }

                
            } catch (error) {
                console.error();
            }
        }
        fetchDeckData();
    }, []);

    

    const onChange = (e, direction) => {
        if(direction === 'left' && currentIndex === 0){
            setCurrentIndex(deck.length - 1);
        }else if(direction === 'left'){
            setCurrentIndex(prevIndex => prevIndex - 1);
        }else if(direction === 'right' && currentIndex === deck.length - 1){
            setCurrentIndex(0);
        }else{
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    } 
    return (
        <>
            {deck && (
                
                <div className="card--elements">
                {/* Figure a way to have this above of the slider <h1>Popular Decks</h1> */}
                    <h1 className="card--header">Popular Decks:</h1>
                    <FaCircleArrowLeft 
                        className="left--arrow"
                        onClick={e => onChange(e, 'left')}
                    />
                    <Card  
                        img={deck[currentIndex].img}
                        name={deck[currentIndex].name}
                    />
                    <FaCircleArrowRight 
                        className="right--arrow" 
                        onClick={e => onChange(e, 'right')}
                    />
                </div>
                
                )
            }
            
            
        </>
    )
}