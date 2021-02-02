import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

/**Run rfce to get rows */
export function Row({title, fetchUrl,isLargeRow}) {

    /**Keeps track of the movies. When refreshed it disappears (Tracker) 
     * state is the way to write variables in react 
    */
    const [movies,setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    //a snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        //if [] is empty the code will only run once when the page loads, if a variable, e.g. movies is used it will run when the movie changes
        // async is used for anything that is making a call to an external api
        async function fetchData() {
            // when request is made to tmdb wait for response then do something
            const request = await axios.get(fetchUrl);
            //console.log(request);
            setMovies(request.data.results);
            return request;
          }
        fetchData();
    },[fetchUrl]); // fetchUrl is a dependency as it is a variable from outside useEffect
   // console.log(movies);


    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            //https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    // when user clicks on a picture handleclick will be called
    const handleClick = (movie) => {
        //if the trailer was already playing its hidden
        if(trailerUrl){
            setTrailerUrl("");
        }
        else{
            movieTrailer(movie?.name || "")
                .then(url => {
                    //https://www.youtube.com/watch?v=-cMqr9HpZ-Y  
                    // the above is an example of the url we are getting
                    const urlParams =new URLSearchParams(new URL(url).search)
                   setTrailerUrl(urlParams.get("v"));//gets the value of v 

            }).catch((error) => console.log(error));
        }
    }


    return (
        <div className="row">
           <h2>{title}</h2>

            <div className="row_posters">

                {movies.map(movie => (
                    <img 
                    /**The key is just something unique used for optimization */
                    key = {movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    src = {`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                    />
                ))}

            </div>
            {/**When there is a trailer url then show the YouTube video */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

        </div>
    )
}

export default Row;