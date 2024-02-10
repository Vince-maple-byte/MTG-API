import React from 'react';
import './formatversion.css';
import {Link, useParams} from 'react-router-dom';
import tableData from './tables/tabledata.js';
import axios from 'axios';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
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
    const [data, setData] = React.useState([])

    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
      });

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                console.log(id.toLowerCase())
                let response = '';
                if(id.toLocaleLowerCase() === 'duel commander'){
                    response = await axios.get(`http://localhost:3000/duel-commander`);
                }
                else if(id.toLocaleLowerCase() === 'canadian highlander'){
                    response = await axios.get(`http://localhost:3000/canadianHighlander`);
                }
                else{
                    response = await axios.get(`http://localhost:3000/${id.toLowerCase()}`);
                }
                
                console.log(response.data)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <h1 className='format'>Format: {id}</h1>
            <div className='format--table'>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} >
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
                            <tr 
                                key={row.id} 
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className='cell--rows'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>     
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="format--pagination">
                    <button 
                        className="pagination--firstPage"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button 
                        className="pagination--previousPage"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button 
                        className="pagination--nextPage"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button 
                        className="pagination--lastPage"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                    <span>
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </strong>
                    </span>
                    <select 
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
        </>
    )
}