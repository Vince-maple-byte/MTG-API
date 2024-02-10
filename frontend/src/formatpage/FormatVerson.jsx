import React from 'react';
import './formatversion.css';
import {useParams} from 'react-router-dom';
import tableData from './tables/tabledata.js';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table';

  
const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('deckImage',{
        header: 'Deck Image',
        cell: url => <img src={url.getValue()} alt="" className='format--version--image'/> //Cell changes the values in the cell
    }),
    columnHelper.accessor('deckName', {
        id: 'deckName',
        header: 'Deck Name',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('deckPercentage', {
        id: 'deckPercentage',
        header: 'Deck Percentage',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('formatVersion', {
        id: 'formatVersion',
        header: 'Format Version',
        cell: info => info.getValue(),
    }),
];



export default function FormatVersion(){
    const {id} = useParams();
    const [data, setData] = React.useState(tableData)

    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

    return (
        <>
            <h1 className='format'>Format: {id}</h1>
            <div className='format--table'>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </>
    )
}