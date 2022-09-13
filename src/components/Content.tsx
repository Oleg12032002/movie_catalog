import React from "react"
import {Movies} from './Movies'
import {MovieCard} from './MovieCard'
import {Filter} from './Filter'
import { MovieType } from "./Interface"

const Content = () => {
    
    const [movies, setMovies] = React.useState< Array<MovieType> >([]);



    const [selectedType, setSelectType] = React.useState< Array< string > >([]);
    const [selectedGenre, setSelectGenre] = React.useState< Array< string > >([]);
    const [selectedYears, setSelectYears] = React.useState< Array<number> >([0, 3000]);
    const [selectedName, setSelectName] = React.useState< string >("");

    const handleChangeType = async (e: any) => {
        if(e.target.checked == true) {
            setSelectType([...selectedType, e.target.name])
        } else {
            setSelectType([...selectedType].filter(el => el != e.target.name))
        }
    }

    const handleChangeGenre = async (e: any) => {
        if(e.target.checked == true) {
            await setSelectGenre([...selectedGenre, e.target.name])
        } else {
            await setSelectGenre([...selectedGenre].filter(el => el != e.target.name))
        }
    }

    const handleChangeName = async (e: any) => {
        setSelectName(e.target.value)
    }


    const handleChangeYear = (event: any, newValue: Array<number>, activeThumb: any) => {
        if(Math.round(newValue[0]) == selectedYears[0] && Math.round(newValue[1]) == selectedYears[1]) {
            return;
        }

        setSelectYears([newValue[0], newValue[1]]);
    };

    const handleSend = () => {
        getMovies();
    }



    const getMovies = async () => {
        try {
          
            const body = {type: selectedType, genre: selectedGenre, year: selectedYears, name: selectedName};
            
            const response = await fetch("http://localhost:5000/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const jsonData: Array<MovieType> = await response.json();

            setMovies(jsonData);

        } catch (err: any) {
            console.error(err.message);
        }
    }


    React.useEffect(() => {
        
        getMovies();
    }, []);

    
    return (
        <div className="content">
            <Filter
                selectedType={selectedType}
                selectedGenre={selectedGenre}
                selectedYears={selectedYears}
                selectedName={selectedName}
                handleChangeName={handleChangeName}
                setSelectYears={setSelectYears}
                handleChangeType1={handleChangeType} 
                handleChangeGenre1={handleChangeGenre} 
                handleChangeYear={handleChangeYear}
                handleSend={handleSend}
            />

            <div className="card-area">
                <Movies movies={
                    movies.filter(el => {
                        return el.Title.toLowerCase()
                            .includes(selectedName.trim().toLowerCase())
                        })
                    } 
                />
            </div>
        </div>
    )
}

export {Content}