import { Grid, Typography } from '@mui/material'
import React from 'react'
import Gamecollection from '../Components/Home/GameCollection'

export default function Home() {

    return (
        <Grid>
            <Grid sx={{ mt: 3, mb: 3 }} container algin="center" justifyContent="center">
                <img width={380} src="https://cdn.discordapp.com/attachments/928138608894967828/958891765342044160/Logo_nav_noBG__blue.png"></img>
            </Grid>
            <Grid sx={{ mt: 3, mb: 3 }} container algin="center" justifyContent="center">
                <Typography fontWeight={"bold"} variant="h4" component="h4">
                    Explora , reseña, puntúa y encuentra nuevos jugadores
                </Typography>
            </Grid>
            <Gamecollection header="Más Recientes" />
            <Gamecollection header="Mejores Votados" />
            <Gamecollection header="Más Reseñados" />
        </Grid>
    )
}
