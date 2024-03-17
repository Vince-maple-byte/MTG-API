import React from "react";
import { useEffect,useState } from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import './cardinfo.css';
import icon from './icon';

export default function Card(){
    const [card, setCard] = useState();
    const {search} = useLocation(); //Gives us the current url 
    const id = Object.fromEntries([...new URLSearchParams(search)])
    console.log(id);

    useEffect(()=>{
        const cardInfo = async(cardId)=>{
            cardId.card = (cardId.card.includes('/') && !cardId.card.includes('//')) ? 
                cardId.card.slice(0, cardId.card.indexOf('/') + 1) + '/' + cardId.card.slice(cardId.card.indexOf('/') + 1) 
                : cardId.card;
            // console.log(cardId.card)
            const encodeCardId = encodeURIComponent(cardId.card);
            const response = await axios.get(`http://localhost:3000/card/${encodeCardId}`)
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
        if(card && card.card_faces && card.card_faces[0] && card.card_faces[0].oracle_text && id.card.includes('/')){
            return `${card.card_faces[0].name}: ${card.card_faces[0].oracle_text}
            \n${card.card_faces[1].name}: ${card.card_faces[1].oracle_text}`
        }
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

    //To get the text of the mana cost just in case the card is a flip card
    const mana = () => {
        if(card && card.card_faces && card.card_faces[0] && card.card_faces[0].mana_cost && id.card.includes('/')){
            return `${card.card_faces[0].name}: ${card.card_faces[0].mana_cost}
            \n${card.card_faces[1].name}: ${card.card_faces[1].mana_cost}`
        }
        if(card && card.card_faces && card.card_faces[0] && card.card_faces[0].mana_cost && id.card === card.card_faces[0].name){
            return `${card.card_faces[0].mana_cost}`
        }
        else if(card && card.card_faces && card.card_faces[1] && card.card_faces[1].mana_cost && id.card === card.card_faces[1].name){
            return `${card.card_faces[1].mana_cost}`
        }
        else {
            return `${card.mana_cost}`
        }
    }

    //Anytime {} is seen in the string it would replace it with the img and the location in the map icon
    const replaceManaStrings = (inputString) => {
        const regexPattern = new RegExp(Array.from(icon.keys()).map(key => key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|'), 'g');
      
        // const replacedString = inputString.replace(regexPattern, (match) => {
        //   return `${icon.get(match)}`;
        // });
        console.log(inputString)
        const i = inputString.split(new RegExp(`(${regexPattern})`));
        console.log(i);

        const images = i.map((replace,index) => {
            if (icon.has(replace)) {
                return <img key={index} src={`../../` + icon.get(replace)} alt={replace} className="iconImage" />;
              } else {
                return replace;
              }
            })
      
        return images;
      };

    //List what the legal formats of this card
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
        {card ? (
            <div className="card">
                <h1 id="card--name">{id.card}</h1>
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
                            {replaceManaStrings(mana())} {/*Have a function to convert the mana symbols to the appropiate mana symbol image*/}
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
                            <div>{card.set_name} </div>
                        </div>
                        
                        <div className="card--text">
                            <div>Text:</div>
                            <div>{replaceManaStrings(oracle())}</div> {/*The text that specifies what are the card */}
                            
                        </div>
                        
                    </div>
                    {/* <div className="card--links">
                        KIIN123123123123
                    </div>  */}
                </div>
            </div>
        )
        :
        (
            // If the card does not exist we are going to print this out
            <div className="">Sorry this card {id.card} does not exist</div> 
        )
        }

        
        </>
    )
}