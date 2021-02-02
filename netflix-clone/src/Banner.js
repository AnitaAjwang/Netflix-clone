import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';
import "./Banner.css";

export function Banner(props) {
    // The state is responsible for whatever random movie gets selected at the top/ banner
    const [movie,setMovie] = useState([]);

    useEffect(() => {
        async function fetchData()
        {
            const request = await axios.get(requests.fetchNetflixOriginals);
            //getting a random movie. -1 is to ensure we don't go over the limit
            //set a movie randomly
            setMovie(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length-1)
                ]  
                );
            return request;
        }
        fetchData();
    }, []);
   // console.log(movie);
    
   // truncate / add ellipsis after a certain number of characters
   function truncate(str,n){
       return str?.length > n ? str.substr(0, n - 1) + "..." : str;
   }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">
                    {/**if movie title doesnt exist then look for name  */}
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner_buttons">
                    {/* div.banner_buttons>button.banner_buttons*2    use emmet*/}
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>

                <h1 className="banner_description">
                    {truncate(movie?.overview, 150 )}
                </h1>

            </div>

            <div className="banner_fadeBottom"></div>
            
        </header>
    )
}

export default Banner;
