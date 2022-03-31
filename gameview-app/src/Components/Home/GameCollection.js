import { Grid, Paper, Stack, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import Carousel from 'react-elastic-carousel'
import "../../css/Carousel.css"
import CardGame from '../CardGame'

export default function Gamecollection(props) {

    const paperStyle2 = { padding: 20, width: "80%", margin: "20px auto" }

    const CbreakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 3, itemsToScroll: 3 },
        { width: 768, itemsToShow: 4, itemsToScroll: 4 },
        { width: 960, itemsToShow: 5, itemsToScroll: 5 },
        { width: 1200, itemsToShow: 6, itemsToScroll: 6 }
    ]
    return (
        <Fragment>
            <Grid justifyContent="center">
                <Paper elevation={8} style={paperStyle2} sx={{ background: "secondary" }}>
                    <Typography variant="h4">
                        {props.header}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Grid container>
                            <Carousel className='styling-example' breakPoints={CbreakPoints}>
                                <CardGame image="./img/league.jpg" tittle="League of Legends" cat_1="MOBA" cat_2="Acción" />
                                <CardGame image="./img/apex.jpg" tittle="Apex Legends" cat_1="Shooter" cat_2="Battle Royale" />
                                <CardGame image="./img/battlefield4.jpg" tittle="Battlefield 4" cat_1="Shooter" cat_2="Acción" />
                                <CardGame image="./img/skyrim.jpg" tittle="Skyrim" cat_1="Rol" cat_2="Aventura" />
                                <CardGame image="./img/crash_ctr.jpg" tittle="Crash Team Racing" cat_1="Carreras" cat_2="Plataformas" />
                                <CardGame image="./img/league.jpg" tittle="League of Legends" cat_1="MOBA" cat_2="Acción" />
                                <CardGame image="./img/apex.jpg" tittle="Apex Legends" cat_1="Shooter" cat_2="Battle Royale" />
                                <CardGame image="./img/battlefield4.jpg" tittle="Battlefield 4" cat_1="Shooter" cat_2="Acción" />
                                <CardGame image="./img/skyrim.jpg" tittle="Skyrim" cat_1="Rol" cat_2="Aventura" />
                                <CardGame image="./img/crash_ctr.jpg" tittle="Crash Team Racing" cat_1="Carreras" cat_2="Plataformas" />
                                <CardGame image="./img/league.jpg" tittle="League of Legends" cat_1="MOBA" cat_2="Acción" />
                                <CardGame image="./img/apex.jpg" tittle="Apex Legends" cat_1="Shooter" cat_2="Battle Royale" />
                                <CardGame image="./img/battlefield4.jpg" tittle="Battlefield 4" cat_1="Shooter" cat_2="Acción" />
                                <CardGame image="./img/skyrim.jpg" tittle="Skyrim" cat_1="Rol" cat_2="Aventura" />
                                <CardGame image="./img/crash_ctr.jpg" tittle="Crash Team Racing" cat_1="Carreras" cat_2="Plataformas" />
                            </Carousel>
                        </Grid>
                    </Stack>
                </Paper>
            </Grid>


        </Fragment>

    )
}
