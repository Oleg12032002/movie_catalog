import React from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';  
import Button from '@mui/material/Button';  


const Filter = props => {

    const [genre, setGenry] = new React.useState([]);
    const [type, setType] = new React.useState([]);
    const [years, setYears] = new React.useState([]);

    const {
        selectedYears, 
        setSelectYears,
        selectedName,
        handleChangeGenre1,
        handleChangeType1,
        handleChangeYear,
        handleChangeName,
        handleSend,
    } = props;


    const handleChangeGenre = (e) => {
        setGenry([...genre].map(el => {
            if(el.name == e.target.name){
                el.checked = !el.checked;
            }
            return el;
        }))
        handleChangeGenre1(e)
    }

    const handleChangeType = (e) => {
        setType([...type].map(el => {
            if(el.name == e.target.name){
                el.checked = !el.checked;
            }
            return el;
        }))
        handleChangeType1(e)
    }


    const getGenre = async () => {
        try {

            const response = await fetch("http://localhost:5000/genre")
            const jsonData = await response.json();

            setGenry(jsonData.map(el => {
                return (
                    {
                        name: el,
                        checked: false
                    }
                )
            }));

        } catch (err) {
            console.error(err.message);
        }
    }


    const getType = async () => {
        try {

            const response = await fetch("http://localhost:5000/type");
            const jsonData = await response.json();

            setType(jsonData.map(el => {
                return (
                    {
                        name: el,
                        checked: false
                    }
                )
            }));

        } catch (err) {
            console.error(err.message);
        }
    }

    const getYears = async () => {
        try {

            const response = await fetch("http://localhost:5000/years")
            const jsonData = await response.json();

            setYears(jsonData);
            setSelectYears([Math.min(...jsonData), Math.max(...jsonData)]);

        } catch (err) {
            console.error(err.message);
        }
    }


    React.useEffect(() => {
        
        getYears();
        getType();
        getGenre();
    }, []);




    return (
        <div className="filter-panel">
            <div className="filter-title">Search</div>
            <Stack spacing={2} sx={{ maxwidth: 300 }}> 
                 <TextField 
                    label="Enter movie"
                    value={selectedName}
                    onChange={handleChangeName}
                />
            </Stack>
        
            <div className="checkbox-genre">
                <div className="filter-title">
                    Genre
                </div>
                <div className="checkboxes">
                    {
                        genre.map(el => {
                            return <div className="checkbox">
                                <div className="label-filter">{el.name}</div>
                                <Checkbox
                                    onChange={handleChangeGenre}
                                    name={el.name}
                                    checked={el.checked}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        })
                    }
                </div>
            </div>


            <div className="checkbox-type">
                <div className="filter-title">
                    Type
                </div>
                <div className="checkboxes">
                    {
                        type.map(el => {
                            return <div className="checkbox">
                                <div className="label-filter">{el.name}</div>
                                <Checkbox
                                    onChange={handleChangeType}
                                    name={el.name}
                                    checked={el.checked}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="slider-years">
                <Box sx={{ maxwidth: 300 }}>
                    <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        min={Math.min(...years)}
                        max={Math.max(...years)}
                        value={selectedYears}
                        onChange={handleChangeYear}
                        valueLabelDisplay="auto"    
                        disableSwap
                    />
                </Box>
                <div className="select-year">{selectedYears[0]} - {selectedYears[1]}</div>
            </div>
            <div className="btn center" onClick={handleSend}>
                <Button variant="contained">Filter</Button>
            </div>
        </div>
    )
}

export {Filter}