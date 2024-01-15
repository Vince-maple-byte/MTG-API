import React from 'react'
import { useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

export default function Navbar(){
    const [search, setSearch] = useState("");

    //We make an api call to send them to the deck page of what they searched for
    function handleSubmit(event){
        event.preventDefault();
        console.log(event);
    }

    function handleChange(event) {
        const searchData = event.target.value;
        console.log(event)
        setSearch(searchData)
    }

    return (
        <div className='nav'>
            <div className='nav--logo'>
                <img src="\resources\lotusIconTest.png" alt="" className='nav--image' />
                <h4>MTG Mastery</h4>
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
                <Link to={`/`}>Home</Link>     
                <Link to={`/format`}>Formats</Link>
                <Link to={`/about`}>About Us</Link>
                <Link>More</Link>
            </div>
        
        </div>
    )

}