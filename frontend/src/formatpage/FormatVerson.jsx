import React from 'react';
import './formatversion.css';
import {Link, useParams} from 'react-router-dom';


export default function FormatVersion(props){
    const {id} = useParams();

    return (
        <>
            <h1 className='format'>Format: {id}</h1>
            <h1 className='meek'>JJJ</h1>
            <h1> Crack Cocaine</h1>
            <div className="modern--table">
                
            </div>
        </>
    )
}