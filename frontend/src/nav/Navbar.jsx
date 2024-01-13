import React from 'react'
import { useState } from 'react';
import './Navbar.css'

export default function Navbar(){
    const [search, setSearch] = useState("");

    //We make an api call to send them to the deck page of what they searched for
    function handleSubmit(event){
        event.preventDefault();
        console.log(search);
    }

    function handleChange(event) {
        const searchData = event.target.value;
        setSearch(prevSearch => searchData)
    }

    return (
        <div className='nav'>
            <div className='nav--logo'>
                <img src="\resources\lotus.png" alt="" className='nav--image' />
                <h4>MTG API</h4>
                <form className='nav--search' onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='Search a deck'
                        onChange={handleChange}
                        name='searchData'
                        value={search}
                    />
                    <button>Search</button>
                </form>

            </div>

            <div className='nav--format_list'>
                <h4>Home</h4>     
                <h4>Formats</h4>
                <h4>About Us</h4>
                <h4>More</h4>
            </div>
        
        </div>
    )

}