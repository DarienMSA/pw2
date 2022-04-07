import { alpha, Divider, Grid, Pagination, styled, ThemeProvider, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import BrowserCard from '../Components/Browser/BrowserCard'
import btheme from '../Components/GameView-Theme';

const StyledPagination = styled(Pagination)(({ theme }) => ({


    '& .MuiPaginationItem-root': {
        background: "#FFF2EF",
        '&:hover': {
            backgroundColor: alpha("#FFF2EF", 0.25), //white_gv
        },
    }
}));

export default function Browser() {
    return (
        <ThemeProvider theme={btheme}>


            <Fragment>

                <Grid container>
                    <Grid>
                        <Typography variant="h4" sx={{ mt: 2.5, ml: 25 }}>
                            Resultados de Búsqueda: Death By Daylight
                        </Typography>
                    </Grid>
                </Grid>
                <Divider variant="inset" sx={{ mb: 1.5, mt: 0.5 }} />
                <Grid container justifyContent="center">
                    <BrowserCard image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="League of Legends" cat_1="MOBA" cat_2="Acción" cat_3="Amigos" />
                    <BrowserCard image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Dead by Daylight" cat_1="Terror" cat_2="Supervivencia" cat_3="Amigos" />
                    <BrowserCard image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Apex Legends" cat_1="Shooter" cat_2="Battle Royale" cat_3="Amigos" />
                    <BrowserCard image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Battlefield 4" cat_1="Shooter" cat_2="Acción" cat_3="Amigos" />
                    <BrowserCard image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Crash Team Racing" cat_1="Carreras" cat_2="Plataformas" cat_3="Amigos" />
                    <BrowserCard image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Dead by Daylight" cat_1="Terror" cat_2="Supervivencia" cat_3="Amigos" />
                </Grid>

                <Grid container justifyContent="center">
                    <StyledPagination sx={{ mt: 1.5, mb: 1.5 }} align="center" count={10} variant="outlined" shape="rounded" />
                </Grid>

            </Fragment >
        </ThemeProvider>
    )
}