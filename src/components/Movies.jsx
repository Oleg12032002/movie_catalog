import React from "react"
import {MovieCard} from './MovieCard'

const Movies = props => {
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

