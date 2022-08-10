import React from "react"
import {Movies} from './Movies'
import {MovieCard} from './MovieCard'
import {Filter} from './Filter'

const Content = props => {
    
    const [movies, setMovies] = new React.useState([]);



    const [selectedType, setSelectType] = new React.useState([]);
    const [selectedGenre, setSelectGenre] = new React.useState([]);
    const [selectedYears, setSelectYears] = new React.useState([0, 3000]);
    const [selectedName, setSelectName] = new React.useState("");

    const handleChangeType = async (e) => {
        if(e.target.checked == true) {
            setSelectType([...selectedType, e.target.name])
        } else {
            setSelectType([...selectedType].filter(el => el != e.target.name))
        }
    }

    const handleChangeGenre = async (e) => {
        if(e.target.checked == true) {
            await setSelectGenre([...selectedGenre, e.target.name])
        } else {
            await setSelectGenre([...selectedGenre].filter(el => el != e.target.name))
        }
    }

    const handleChangeName = async (e) => {
        setSelectName(e.target.value)
    }


    const handleChangeYear = (event, newValue, activeThumb) => {
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

            const jsonData = await response.json();

            setMovies(jsonData);

        } catch (err) {
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
                {console.log(selectedType)}
            </div>
        </div>
    )
}

export {Content}