import React from "react";
import { useEffect,useState } from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import './cardinfo.css';

export default function Card(){
    const [card, setCard] = useState();
    const {search} = useLocation(); //Gives us the current url 
    const id = Object.fromEntries([...new URLSearchParams(search)])
    console.log(id);

    useEffect(()=>{
        const cardInfo = async(cardId)=>{
            const response = await axios.get(`http://localhost:3000/card/${cardId.card}`)
            console.log(response.data[0])
            setCard(response.data[0])
        }

        cardInfo(id);
    }, [])

    //Checks if the card being passed on is a dual/flip card and change the image depending on the card name
    const image = () => {
        if(card && card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris && card.card_faces[0].image_uris.png && id.card === card.card_faces[0].name){
            return `${card.card_faces[0].image_uris.png}`
        }
        else if(card && card.card_faces && card.card_faces[1] && card.card_faces[1].image_uris && card.card_faces[1].image_uris.png && id.card === card.card_faces[1].name){
            return `${card.card_faces[1].image_uris.png}`
        }
        else {
            return `${card.image_uris.png}`
        }
    }

    //Gets the oracle text based on whether it is a flipped card or not
    const oracle = () => {
        if(card && card.card_faces && card.card_faces[0] && card.card_faces[0].oracle_text && id.card === card.card_faces[0].name){
            return `${card.card_faces[0].oracle_text}`
        }
        else if(card && card.card_faces && card.card_faces[1] && card.card_faces[1].oracle_text && id.card === card.card_faces[1].name){
            return `${card.card_faces[1].oracle_text}`
        }
        else {
            return `${card.oracle_text}`
        }
    } 

    //Makes an object that returns the rarity of the card. Color is to determine what class name to use and Name is the text.
    const rarity = () => {
        if(card && card.rarity && card.rarity === 'common') {
            return ({
                color: 'common',
                name: 'Common'
            })
        }
        else if(card && card.rarity && card.rarity === 'uncommon') {
            return ({
                color: 'uncommon',
                name: 'Uncommon'
            })
        }
        else if(card && card.rarity && card.rarity === 'rare') {
            return ({
                color: 'rare',
                name: 'Rare'
            })
        }
        else{
            return ({
                color: 'mystic',
                name: 'Mystic'
            })
        }
    }

    const legal = () => {
        let formatLegal = new Array();
        formatLegal.push((card && card.legalities.alchemy === 'legal') ? `✅ Alchemy` : `❌ Alchemy`);
        formatLegal.push((card && card.legalities.duel === 'legal') ? `✅ Duel` : `❌ Duel`);
        formatLegal.push((card && card.legalities.explorer === 'legal') ? `✅ Explorer` : `❌ Explorer`);
        formatLegal.push((card && card.legalities.historic === 'legal') ? `✅ Historic` : `❌ Historic`);
        formatLegal.push((card && card.legalities.legacy === 'legal') ? `✅ Legacy` : `❌ Legacy`);
        formatLegal.push((card && card.legalities.modern === 'legal') ? `✅ Modern` : `❌ Modern`);
        formatLegal.push((card && card.legalities.pauper === 'legal') ? `✅ Pauper` : `❌ Pauper`);
        formatLegal.push((card && card.legalities.pioneer === 'legal') ? `✅ Pioneer` : `❌ Pioneer`);
        formatLegal.push((card && card.legalities.standard === 'legal') ? `✅ Standard` : `❌ Standard`);
        formatLegal.push((card && card.legalities.vintage === 'legal') ? `✅ Vintage` : `❌ Vintage`);

        return formatLegal;
    }
    return (
        <>
        {card && 
            <div className="card">
                <h1>{id.card}</h1>
                <div className="card--content">
                    <img src={image()} id="cardImg"/>
                    <div className="card--information">
                        <div className="card--prices">
                            <div>Prices:</div>
                            {/* Checks if the card.prices has a value and if not we don't print out anything */}
                            <div>{card.prices.usd !== null ? `USD: ${card.prices.usd}` : ``}</div>
                            <div>{card.prices.eur !== null ? `EURO: ${card.prices.eur}` : ``}</div>
                            <div>{card.prices.tix !== null ? `TICKETS: ${card.prices.tix}` : ``}</div>
                        </div>
                        
                        <div className="card--manacost">
                            Mana Cost:
                            {card.mana_cost} {/*Have a function to convert the mana symbols to the appropiate mana symbol image*/}
                        </div>
                        Legality:
                        <div className="card--legal">
                            {legal().map((currLegal, index) => <div key={index}>{currLegal}</div>)}{/* Here we are going to list the formats this card is legal in*/}
                        </div>
                        
                        <div className="card--rarity">
                            <div>Rarity:</div>
                            <div className={rarity().color}>{rarity().name}</div>
                        </div>
                        
                        <div className="card--setname">
                            Set:
                            <div>{card.set_name}</div>
                        </div>
                        
                        <div className="card--text">
                            <div>Text:</div>
                            {oracle()} {/*The text that specifies what are the card */}
                        </div>
                        
                    </div>
                    {/* <div className="card--links">
                        KIIN123123123123
                    </div>  */}
                </div>
            </div>
        }
        </>
    )
}