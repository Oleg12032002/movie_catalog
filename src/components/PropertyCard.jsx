import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PropertyCard = (props) => {
    const {param, text} = props;

    return (
        <>
             <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                        {param}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} component="div">
                        {text}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export {PropertyCard}