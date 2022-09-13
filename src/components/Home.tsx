import React from "react";
import {Footer} from './Footer'
import {Header} from './Header'
import {Content} from './Content'


const Home = () => {
    return (
        <>
            <Header isMoviePage={false}/>
            <Content />
            <Footer />
        </>
    )
}

export {Home}