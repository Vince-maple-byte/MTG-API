import React from 'react';
import './formatversion.css';
import {Link, useParams} from 'react-router-dom';


export default function FormatVersion(props){
    const {id} = useParams();

    return (
        <>
            <h1>Format Version: {id}</h1>
        </>
    )
}