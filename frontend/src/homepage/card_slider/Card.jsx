import React from 'react'
import {Link} from 'react-router-dom'
import './Card.css'
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function Card(props){
    return (
        <>  
            <div className="card--elements">
                <FaCircleArrowLeft />
                <Link to={`/format`} className='card'>
                    <img src={props.cards[0].img} alt="" className='card--img'/>
                    <div className="card--name">{props.cards[0].name}</div>
                </Link>
                <FaCircleArrowRight />    
            </div>
            
        </>
    )
}