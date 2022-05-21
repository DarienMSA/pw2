import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Divider, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';

export default function ActiveGame(props) {
    const navigate = useNavigate();
    const goNavigate = url => () => {
        navigate(url)
    }

    return (
        <Card elevation={10} onClick={goNavigate(`/browse/game?id=${props.game._id}`)} sx={{ cursor: "pointer", maxWidth: 345, margin: "10px", borderRadius: 5 }} >
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={props.game.image}
            />
            <CardContent>
                <Divider variant="middle"> <Chip label={props.game.name} /> </Divider>
            </CardContent>
            <CardActions >



            </CardActions>
        </Card>
    )
}
