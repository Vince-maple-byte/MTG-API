import React from 'react'
import {Link} from 'react-router-dom'
import './Card.css'


export default function Card(props){
    return (
        <>  
            <Link to=
            {`/deck?deckName=${encodeURIComponent(props.name)}&format=${encodeURIComponent('Standard')}&formatVersion=${encodeURIComponent('standardLast2Months')}`}
             className='card--div'>
                    <img src={props.img} alt="" className='card--img'/>
                    <div className="card--name">{props.name}</div>
            </Link>          
        </>
    )
}