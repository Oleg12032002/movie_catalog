import React from "react"
import { MovieType } from "./Interface"
import {MovieCard} from './MovieCard'

const Movies = (props: {movies: Array<MovieType>}) => {
    return (
        <>
            {
                props.movies.map( (el) => {
                    return <MovieCard {...el} />
                })
            }
        </>
    )
}

export {Movies}

