import { Grid, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import btheme from '../Components/GameView-Theme'
import Gamecollection from '../Components/Home/GameCollection'
import { useNavigate } from "react-router-dom"
import LoggedBar from '../Components/loggedBar'
import UnloggedBar from '../Components/unloggedBar'
import { GetGamesSortedBy } from '../Services/GameServices'

export default function Home() {
    const session = localStorage.getItem("UserSession");

    return (
        <ThemeProvider theme={btheme}>
            {session !== null ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
            <Grid>
                <Grid sx={{ mt: 3, mb: 3 }} container alignItems="center" justifyContent="center">
                    <img width={380} src="https://cdn.discordapp.com/attachments/928138608894967828/958891765342044160/Logo_nav_noBG__blue.png"></img>
                </Grid>
                <Grid sx={{ mt: 3, mb: 3 }} container alignItems="center" justifyContent="center" textAlign={"center"}>
                    <Typography fontWeight={"bold"} variant="h4" component="h4" fontFamily={"Ubuntu"}>
                        Explora, reseña, puntúa y encuentra nuevos jugadores
                    </Typography>
                </Grid>
                <Gamecollection sortBy="activeUsersLength" header="Con más jugadores buscando..." alignText="left" />
                <Gamecollection sortBy="score" header="Mejor Puntuados" alignText="center" />
                <Gamecollection sortBy="reviewsLength" header="Más Reseñados" alignText="right" />
            </Grid>
        </ThemeProvider>
    )
}
