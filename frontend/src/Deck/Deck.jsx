import React from 'react'
import { useEffect, useState } from 'react'
import {useLocation, Link} from 'react-router-dom'
import axios from 'axios'
import './deck.css'

export default function Deck(){
    const [deck, setDeck] = useState();
    const {search} = useLocation()
    const deckInfo = Object.fromEntries([...new URLSearchParams(search)])

    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = JSON.stringify(deckInfo);
              const config = {
                method: 'post',
                url: 'http://localhost:3000/deck',
                headers: {
                  'Content-Type': 'application/json'
                },
                data: data
              };
              const response = await axios.request(config);
              setDeck(response.data[0]);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          // Call the async function
          fetchData();
      
    }, [])

    const cardMap = (cards) => {
      const sectionLength = Math.ceil(cards.length / 3);
      let section = new Array(3);
      for(let i = 0; i < section.length; i++){
        section[i] = new Array();
      }
      for(let i = 0; i < cards.length; i++){
        if(i < sectionLength){
          section[0].push(
            <Link key={i} to={`/card?card=${String(cards[i]).substring(2)}`}>{cards[i]}</Link>
          )
        }
        else if(i < sectionLength * 2){
          section[1].push(
            <Link key={i} to={`/card?card=${String(cards[i]).substring(2)}`}>{cards[i]}</Link>
          )
        }
        else{
          section[2].push(
            <Link key={i} to={`/card?card=${String(cards[i]).substring(2)}`}>{cards[i]}</Link>
          )
        }
      }
      return section;
    }
    return (
        <>

          <div className="deck">
            <div className="deck--intro">
              <div className="deck--name">
                <img src={deck && deck.deckImage}  />
                <h1>Deck: {deck && deck.deckName}</h1>
              </div>
              <div className="deck--format">
                <Link to={`/format/${deckInfo.format}`}>Format: {deck && deck.format}</Link>

                <div className="deck--formatVersion">
                  Version: {deck && deck.formatVersion}
                </div>
                
              </div>
              
            </div>
            
            <div className="deck--cards">
              <div className="deck--section">
                {deck && cardMap(deck.cards)[0]}
              </div>
              <div className="deck--section">
                {deck && cardMap(deck.cards)[1]}
              </div>
              <div className="deck--section">
                {deck && cardMap(deck.cards)[2]}
              </div>
            </div>
          </div>
            
            
            
            
        </>
    )
}