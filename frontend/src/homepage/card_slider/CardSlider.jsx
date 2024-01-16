import React from "react";
import Card from "./Card.jsx";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import './CardSlider.css';
import { useState } from "react";

export default function CardSlider(){
    const [currentIndex, setCurrentIndex] = useState(0);

    const cards = [
        {
            img:'../../../resources/lotus.png',
            name:'Lotus Color'
        },
        {
            img:'../../../resources/lotusIcon.png',
            name:'Lotus Black/White'
        },
        {
            img:'../../../resources/lotusIconTest.png',
            name:'Lotus'
        },
        {
            img:'../../../resources/lotus.png',
            name:'Dream Lotus'
        },
        {
            img:'../../../resources/lotusIcon.png',
            name:'Bored Lotus'
        }
    ]

    const onChange = (e, direction) => {
        if(direction === 'left' && currentIndex === 0){
            setCurrentIndex(cards.length - 1);
        }else if(direction === 'left'){
            setCurrentIndex(prevIndex => prevIndex - 1);
        }else if(direction === 'right' && currentIndex === cards.length - 1){
            setCurrentIndex(0);
        }else{
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    } 
    return (
        <>
            <div className="card--elements">
                <FaCircleArrowLeft className="left--arrow" onClick={e => onChange(e, 'left')}/>
                <Card  
                    img={cards[currentIndex].img}
                    name={cards[currentIndex].name}
                />
                <FaCircleArrowRight className="right--arrow" onClick={e => onChange(e, 'right')}/>
            </div>
            
        </>
    )
}