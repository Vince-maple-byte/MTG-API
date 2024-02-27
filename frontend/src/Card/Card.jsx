import React from "react";
import { useEffect,useState } from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import './card.css';

export default function Card(){
    const [card, setCard] = useState();
    const {search} = useLocation(); //Gives us the current url 
    const id = Object.fromEntries([...new URLSearchParams(search)])

    useEffect(()=>{
        const cardInfo = async(cardId)=>{
            const response = await axios.get(`http://localhost:3000/card/${cardId.card}`)
            console.log(response.data[0])
            setCard(response.data[0])
        }

        cardInfo(id);
    }, [])
    return (
        <>
        {card && 
            <div className="card">
                <h1>{id.card}</h1>
                <div className="card--content">
                    <img src={`${card.image_uris.png}`} id="cardImg"/>
                    <div className="card--information">
                        Prices:
                        <div className="card--prices">
                            <div>USD: {card.prices.usd}</div>
                            <div className="">EURO: {card.prices.eur}</div>
                            <div className="">TICKETS: {card.prices.tix}</div>
                        </div>
                        Mana Cost:
                        <div className="card--manacost">
                            {card.mana_cost} {/*Have a function to convert the mana symbols to the appropiate mana symbol image*/}
                        </div>
                        Legality:
                        <div className="card--legal">
                            {/* Here we are going to list the formats this card is legal in*/}
                        </div>
                        Rarity:
                        <div className="card--rarity">
                            {card.rarity}
                        </div>
                        Set:
                        <div className="card--setname">
                            {card.set_name}
                        </div>
                        Text:
                        <div className="card--text">
                            {card.oracle_text}
                        </div>
                        
                    </div>
                    <div className="card--links">
                        KIIN
                    </div>
                </div>
            </div>
        }
        </>
    )
}