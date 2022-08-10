import React from "react";
import { useParams } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import {PropertyCard} from './PropertyCard'
import {Footer} from './Footer'
import {Header} from './Header'


const MoviePage = props => {

    const {id} = useParams();

    const [movie, setMovie] = new React.useState({Images: []});



    const getMovie = async () => {
        try {
            const body = {id};
            const response = await fetch("http://localhost:5000/movie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            setMovie(jsonData);
        } catch(err) {
            console.error(err.message);
        }
    }


    React.useEffect(() => {
        
        getMovie();
    }, []);


    return (
        <>
            <Header isMoviePage={true}/>
            <div className="movie-content">
                <div className="movie-poster">
                    <img width="100%" src={`https://via.placeholder.com/150x200.png?text=${movie.Title}`}></img>
                </div>

                <div className="params">
                    <div className="params-title">{movie.Title}<div className="params-title-type">{movie.Type}</div></div>
                    
                    <div className="params-table">
                       {
                        Object.keys(movie).map(el => {
                            if(["Plot", "imdbRating", "Poster", "Images", "Response", "imdbVotes", "Metascore", "imdbID", "Type", "ComingSoon"].includes(el) || movie[el] == "N/A") return;
                            return (
                                <PropertyCard param={el} text={movie[el]}/>
                            )
                        })
                       }
                    </div>
                    <div className="params-title-2">Description</div>
                    <div className="params-description">
                        {movie.Plot}
                    </div>

                    <div className="params-rating">
                        <div className="rating">{movie.imdbRating == "N/A" ? "0.0" : movie.imdbRating}</div>
                        <div className="votes">{movie.imdbVotes == "N/A" ? "" : movie.imdbVotes}</div>
                    </div>
                </div>
            </div>
            <div className="carousel">
            <Carousel>
                {
                    movie.Images.map(el => {
                        return (
                            <div>
                                <img src={el} />
                            </div>
                        )
                    })
                }
            </Carousel>
            </div>
            <Footer />
        </>
    )
}

export {MoviePage}