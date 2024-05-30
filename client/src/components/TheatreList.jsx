import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {format} from  "date-fns";
import { Link } from 'react-router-dom';


function TheatreList() {
    const [theatres, setTheatres] = useState([]);
    const { movieId } = useParams();

    const loadTheatres = async() => {
        const response = await fetch(`http://localhost:3001/api/show/list?movie=${movieId}&date=2019-08-14`);
        const theatreList = await response.json();
        setTheatres(theatreList);
    }

    useEffect(() => {
        loadTheatres();
    }, []);

    return (
        <>
            {
                theatres.map(theatre => (
                    <div className="flex border border-blue-500 p-4 rounded shadow m-2">
                        <div className="w-1/3">
                            <div className="text-lg font-bold">Theatre Name</div>
                            <div className="text-sm font-regalar">Theatre Id: {theatre._id}</div>
                        </div>
                        <div className="w-2/3 flex gap-2">
                            {
                                theatre.shows.map((show) => (
                                    <Link to={`/show/${show._id}`}>
                                        <button className="bg-transparent border border-blue-500 text-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-white">
                                            {format(new Date(show.datetime), 'hh:mm a')}
                                        </button>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                ))
            }  
        </>
    )
  
}

export default TheatreList;
