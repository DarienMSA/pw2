import { ThemeProvider } from '@mui/material'
import React from 'react'
import btheme from '../Components/GameView-Theme'
import Gamecollection from '../Components/Home/GameCollection'

export default function Home() {

    return (
        <div>
            <ThemeProvider theme={btheme}>
                <Gamecollection header="Más Recientes"/>
                <Gamecollection header="Mejores Votados"/>
                <Gamecollection header="Más Receñados"/>
            </ThemeProvider>
        </div>
    )
}
