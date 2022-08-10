import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'


const MovieCard = props => {
    return (
        <>
            <Link to={"/" + props.imdbID}>
                <Card sx={{ maxHeight: 350 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.Images[0]}
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.Title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.Plot.length < 200 ? props.Plot : props.Plot.substr(0, 200)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" height={100}></Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </>
    )
}

export {MovieCard}