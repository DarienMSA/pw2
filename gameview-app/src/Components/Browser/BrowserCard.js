import { Avatar, Box, Button, CardActionArea, CardContent, CardMedia, Chip, Divider, Grid, Modal, Paper, Rating, Stack, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors';
import React, { Fragment } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 720,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "1%",
};

export default function BrowserCard(props) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    const handleClick2 = () => {
        console.info('Click tittle');
    };

    const styles = theme => ({
        tr: {
            margin: 1,
            '&:hover': {
                margin: 0.5,
            },
        },
    });

    const classes = styles();

    return (
        <Fragment>
            <Paper elevation={6} sx={{ width: 720, margin: 1 }}>
                <CardActionArea onClick={handleOpen} sx={{ display: "flex", alignContent: "flex-start" }}>
                    <CardMedia className={classes.tr}
                        component="img"
                        height="220px"
                        sx={{ width: 260, borderRadius: 1, margin: 1 }}
                        image={props.image}
                        alt="Crash"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            marginLeft: .5
                        }} onClick={handleClick2}>
                            {props.tittle}
                        </Typography>
                        <Stack direction="row" padding={1} spacing={0.5} sx={{ margin: 1, maxWidth: 460, overflow: "auto", overflowY: "hidden" }}>
                            <Chip sx={{ minWidth: 0.15 }} label={props.cat_1} onClick={handleClick} color="info" size="small" />
                            <Chip sx={{ minWidth: 0.15 }} label={props.cat_2} onClick={handleClick} color="info" size="small" />
                            <Chip sx={{ minWidth: 0.15 }} label={props.cat_3} onClick={handleClick} color="info" size="small" />
                            <Chip sx={{ minWidth: 0.15 }} label={props.cat_3} onClick={handleClick} color="info" size="small" />
                            <Chip label="+" onClick={handleClick} color="info" size="small" />
                        </Stack>
                        <Divider variant="middle" sx={{ mb: 1.5, mt: 0.5 }} />
                        <Typography sx={{
                            ml: 2,
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 4,
                        }} variant="body2" color="text.secondary">
                            League of Legends es un videojuego del género multijugador de arena de batalla en línea y deporte electrónico
                            el cual fue desarrollado por Riot Games para Microsoft Windows y OS X y para consolas digitales.
                            League of Legends es un videojuego del género multijugador de arena de batalla en línea y deporte electrónico
                            el cual fue desarrollado por Riot Games para Microsoft Windows y OS X y para consolas digitales.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Paper >
        </Fragment>
    )
}
