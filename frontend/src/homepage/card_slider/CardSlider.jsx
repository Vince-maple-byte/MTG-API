import React from "react";
import Card from "./Card"

export default function CardSlider(){
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
    return (
        <>
            <Card 
                cards={cards}
            />
        </>
    )
}