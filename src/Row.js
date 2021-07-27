import React, { useState, useEffect } from "react";
import instance from "./axios";
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, islargerow}){
    const [movies, setMovies] = useState([]);
    const [trailerurl, settrailerurl] = useState("");
    
    useEffect(()=>{

        async function fetchdata(){

            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;

        }
        fetchdata();

    }, [fetchUrl]); // dependency has to be included here..
//map funciton is used to map evey single result of the movies search to a specific task.

    const handleclick = (movie)=>{
        if(trailerurl){
            settrailerurl("");  // close the player if double clicked
        }
        else{
            movieTrailer(movie?.name || "")
            .then(url =>{

                //get the id
                const urlparams = new URLSearchParams(new URL(url).search);
                settrailerurl(urlparams.get('v'));
            }).catch((error) => console.log(error));
        }
    }

    const opts ={
        height:"390",
        width:"100%",
        playerVars:{
            // https://developers.google.com/youtube/player_parameters
            autoplay:1,
        },
    };
    return (
        <div className = "row">
            <h2>{title}</h2>
            <div className = "row_posters">
                {movies.map(movie =>(
                    <img className={`${islargerow ? "row_poster_large" : "row_poster"}`}
                    key = {movie.id} 
                    onClick= {()=>handleclick(movie)}
                    src = {`${base_url}${islargerow? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                ))}
            </div>

            {trailerurl && <YouTube videoId={trailerurl} opts={opts}/>}
        </div>
    );
}

export default Row