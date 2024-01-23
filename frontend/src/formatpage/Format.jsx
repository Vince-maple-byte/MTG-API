import React from 'react'
import formatdata from './formatdata';
import FormatCard from './FormatCard';
import './format.css'

export default function Format(){
    
    return (
        <>
            <div className="format">
                {formatdata.map(x => {
                    return (
                        <FormatCard 
                            format={x.format}
                            description={x.description}
                        />
                    )
                })}
            </div>
    
        </>
    )
}