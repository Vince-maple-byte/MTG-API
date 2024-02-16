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
    const {id} = useParams(); //Tells us what format this is
    const [data, setData] = React.useState([]) //We keep all of the versions of the format here
    const [deck, setDeck] = React.useState([]) //This is the deck that is going to be displayed based on the option selection
    const [formatVersion, setFormatVersion] = React.useState([]); //Keeps track of the different format versions
    // console.log(deck)
    const table = useReactTable({
        columns,
        data: deck,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
      });

    //This gives us the specific version of the format based on what string value is passed to the function
    const version = (data, versionName) => {
        return data.filter(deck => deck.formatVersion === versionName)
    }

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                //We make an api call for all of the decks in the format
                console.log('useEffect')
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
                
                //Save the api call data here
                setData(response.data);
                setDeck(version(response.data, response.data[0].formatVersion))
                setFormatVersion(optionPane(response.data))
                console.log(response.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    const optionPane = (deckList) => {
        const option = new Set();
        for(let i = 0; i < deckList.length; i++){
            if(!option.has(deckList[i].formatVersion)){
                option.add(deckList[i].formatVersion);
            }
        }
        return Array.from(option);
    }

    return (
        <>
            
            
            <div className='format--table'>
                <div className="format--title">
                    <h1 className='format--titleName'>Format: {id}</h1>
                    <select 
                        className='format--version'
                        onChange={e => setDeck(version(data, e.target.value))}>
                        {formatVersion.map(version => (
                            <option key={version} value={version}>
                                {version}
                            </option>
                        ))}
                    </select>
                </div>
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
                                className='cell--rows'
                                onMouseEnter={
                                    () => row.id && table.setRowState(row.id, {isHovered: true})
                                } 
                                onMouseLeave={() => {
                                    row.id && table.setRowState(row.id, { isHovered: false });
                                }}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} >
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