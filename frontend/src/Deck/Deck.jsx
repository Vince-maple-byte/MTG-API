import React from 'react'
import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
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
              console.log(deck);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          // Call the async function
          fetchData();
      
    }, [])
    return (
        <>
            <h1>{deck && deck.deckName}</h1>
            <h1>{deck && deck.format}</h1>
            <h1>{deck && deck.formatVersion}</h1>
            {deck && deck.cards.map((card,index) => (
                <h1 key={index}>{card}</h1>
            ))}
        </>
    )
}