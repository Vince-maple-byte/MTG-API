import React from "react";
import {Link} from 'react-router-dom';
import './formatcard.css'

export default function FormatCard(props){
    console.log(props.format + ": " + props.description)

    return (
        <div className="format--card">
            <h4 className="format--name">{props.format}</h4>
            <p className="format--desc">{props.description}</p>
        </div>
    )
}