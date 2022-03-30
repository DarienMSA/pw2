import { Divider, Grid, Pagination, ThemeProvider, Typography} from '@mui/material'
import React, { Fragment } from 'react'
import BrowserCard from '../Components/Browser/BrowserCard'


export default function Browser() {
    return (
        <Fragment>
            
                <Grid container>
                    <Grid>
                        <Typography variant="h4" sx={{ mt: 2.5, ml: 25 }}>
                            Resultados de Busqueda .....
                        </Typography>
                    </Grid>
                </Grid>
                <Divider variant="inset" sx={{ mb: 1.5, mt: 0.5 }} />
                <Grid container justifyContent="center">
                    <BrowserCard image="./img/league.jpg" tittle="League of Legends" cat_1="MOBA" cat_2="Acción" cat_3="Amigos" />
                    <BrowserCard image="./img/dbd.jpg" tittle="Dead by Daylight" cat_1="Terror" cat_2="Supervivencia" cat_3="Amigos" />
                    <BrowserCard image="./img/apex.jpg" tittle="Apex Legends" cat_1="Shooter" cat_2="Battle Royale" cat_3="Amigos" />
                    <BrowserCard image="./img/battlefield4.jpg" tittle="Battlefield 4" cat_1="Shooter" cat_2="Acción" cat_3="Amigos" />
                    <BrowserCard image="./img/crash_ctr.jpg" tittle="Crash Team Racing" cat_1="Carreras" cat_2="Plataformas" cat_3="Amigos" />
                    <BrowserCard image="./img/dbd.jpg" tittle="Dead by Daylight" cat_1="Terror" cat_2="Supervivencia" cat_3="Amigos" />
                </Grid>

                <Grid container justifyContent="center">
                    <Pagination sx={{ mt: 1.5, mb: 1.5 }} align="center" count={10} variant="outlined" shape="rounded" />
                </Grid>
            
        </Fragment >
    )
}