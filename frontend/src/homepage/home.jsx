import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../nav/Navbar'
import './home.css'
import CardSlider from './card_slider/CardSlider'

export default function Home(){

    return (
        <>
            <Navbar />
            {/* 
                How this page is going to be set up:
                1)Card slider with a card saying to check out these decks and
                    showing 5 random decks (This can be one from a different format)
                    Each card is going to have an image of a card in the deck and the deck name
                2)An intro of what the project is and a link to the format page.

            */}
            <div className="home">
                <div className="home--intro">
                    <p>Welcome to MTG API. We have collected the top decks in Magic The Gathering 
                    past and present for many different <Link to={`/format`}>formats.</Link></p>  
                </div>
                <div className="home--slider">
                    <CardSlider />
                </div>
            </div>
        </>
    )
}