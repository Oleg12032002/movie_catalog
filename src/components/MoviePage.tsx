import React from "react";
import { useParams } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import {PropertyCard} from './PropertyCard'
import {Footer} from './Footer'
import {Header} from './Header'
import { MovieType } from "./Interface";


const MoviePage = () => {

    const {id} = useParams< {id: string}>();

    const [movie, setMovie] = React.useState<MovieType>(
        {
            ComingSoon: "",
            Title: "",
            Year: "",
            Rated: "",
            Released: "",
            Runtime: "",
            Genre: "",
            Director: "",
            Writer: "",
            Actors: "",
            Plot: "",
            Language: "",
            Country: "",
            Awards: "",
            Poster: "",
            Metascore: "",
            imdbRating: "",
            imdbVotes: "",
            imdbID: "",
            Type: "",
            Response: "",
            Images: Array< string >()
        }
    );

    const getMovie = async () => {
        try {
            const body: object = {id};
            const response = await fetch("http://localhost:5000/movie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData: MovieType = await response.json();
            setMovie(jsonData);
        } catch(err: any) {
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
                        Object.keys(movie).map(a => {
                            const el: string = a
                            if(["Plot", "imdbRating", "Poster", "Images", "Response", "imdbVotes", "Metascore", "imdbID", "Type", "ComingSoon"].includes(el) || movie["Actors"] == "N/A") return;
                            return (
                                <PropertyCard param={el} text={movie["Actors"]}/>
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