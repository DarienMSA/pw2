import { Avatar, Box, Button, CardActionArea, CardContent, CardMedia, Chip, Divider, Grid, Modal, Paper, Rating, Stack, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors';
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';

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
    const navigation = useNavigate();

    const navigationFunction = url => () => {
        navigation(url)
    };


    return (
        <Fragment>
            <Paper elevation={6} sx={{ width: 720, margin: 1 }}>
                <CardActionArea onClick={navigationFunction("/browse/game?id=" + props.g._id)} sx={{ display: "flex", alignContent: "flex-start" }}>
                    <CardMedia
                        component="img"
                        height="220px"
                        sx={{ width: 260, borderRadius: 1, margin: 1 }}
                        image={props.g.image}
                        alt="Crash"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            marginLeft: .5
                        }}>
                            {props.g.name}
                        </Typography>
                        <Stack direction="row" padding={1} spacing={0.5} sx={{ margin: 1, maxWidth: 460, overflow: "auto", overflowY: "hidden" }}>
                            {props.g.genres.map((genre, index) => (
                                index < 4 && (
                                    <Chip key={index} sx={{ minWidth: 0.15 }} label={genre.name} color="info" size="small" />
                                )

                            ))}
                            <Chip label="+" color="info" size="small" />
                        </Stack>
                        <Divider variant="middle" sx={{ mb: 1.5, mt: 0.5 }} />
                        <Typography sx={{
                            ml: 2,
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 4,
                        }} variant="body2" color="text.secondary">
                            {props.g.synopsis}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Paper >
        </Fragment>
    )
}
