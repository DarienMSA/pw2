import { Card, CardActionArea, CardContent, CardMedia, Chip, Divider, Link, Stack, Typography } from '@mui/material'
import React from 'react'

export default function CardGame(props) {

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };
    const handleClick2 = () => {
        console.info('Click tittle');
    };

    return (
        <Card elevation={6} sx={{ minWidth: 160, maxWidth: 200, margin: 1 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="260"
                    image={props.image}
                    alt="Crash"
                />
            </CardActionArea>
            <CardContent sx={{ padding: 1 }}>

                <Typography variant="button" component="div" sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                    marginLeft: .5
                }} onClick={handleClick2}>
                    <Link href='/memes' underline='none' color='inherit'>
                        {props.tittle}
                    </Link>
                </Typography>
                <Divider variant="middle" sx={{ mb: 1.5, mt: 0.5 }} />
                <Stack direction="row" spacing={0.5} justifyContent="center">
                    <Chip sx={{ minWidth: 0.35 }} label={props.cat_1} onClick={handleClick} color="info" size="small" />
                    <Chip sx={{ minWidth: 0.35 }} label={props.cat_2} onClick={handleClick} color="info" size="small" />
                </Stack>
            </CardContent>
        </Card>
    )
}
