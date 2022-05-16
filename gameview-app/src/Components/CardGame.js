import { Card, CardActionArea, CardContent, CardMedia, Chip, Divider, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function CardGame(props) {
    const navigate = useNavigate();

    const navigateFunction = url => () => {
        navigate(url)
    };

    return (
        <Card elevation={6} sx={{ minWidth: 140, maxWidth: 180, margin: 1 }}>
            <CardActionArea>
                <CardMedia
                    onClick={navigateFunction("/browse/game?id=" + props.g._id)}
                    component="img"
                    height="260"
                    image={props.g.image}
                    alt="Crash"
                />
            </CardActionArea>
            <CardContent sx={{ padding: 1 }}>

                <Typography textAlign={"center"} variant="button" component="div" sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                    marginLeft: .5
                }}>

                    {props.g.name}

                </Typography>


                {
                    props.g.genres[0].name && (
                        <>
                            <Divider variant="middle" sx={{ mb: 1.5, mt: 0.5 }} />
                            <Stack direction="row" spacing={0.5} justifyContent="center">
                                <Chip sx={{ minWidth: 0.35 }} label={props.g.genres[0].name} onClick={navigateFunction("/browse?c=" + props.g.genres[0]._id)} color="info" size="small" />
                                <Chip sx={{ minWidth: 0.35 }} label={props.g.genres[1].name} onClick={navigateFunction("/browse?c=" + props.g.genres[1]._id)} color="info" size="small" />
                            </Stack>
                        </>
                    )
                }

            </CardContent>
        </Card>
    )
}
