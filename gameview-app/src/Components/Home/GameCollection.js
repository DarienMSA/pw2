import { Divider, Grid, Paper, Stack, styled, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import Carousel from 'react-elastic-carousel'
import "../../css/Carousel.css"
import CardGame from '../CardGame'

const StyledCarousel = styled(Carousel)(({ theme }) => ({


    '& .rec-arrow': {
        background: "#406882",
        color: "#FFF2EF",
    },
    '& .rec-dot_active': {
        borderColor: "red",
        background: "#406882",
    }
}));

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
            <Divider variant="middle" sx={{ mb: 1.5, mt: 0.5 }} />
            <Grid container textAlign={props.alignText} justifyContent={"left"} alignItems={"left"}>
                <Paper elevation={0} style={paperStyle2} sx={{ background: "#E3EAEE" }}>
                    <Typography mb={2} variant="h4" fontWeight={"bold"} fontFamily={"Ubuntu"}>
                        {props.header}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Grid container>
                            <StyledCarousel className='styling-example' breakPoints={CbreakPoints}>
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="League of Legends" cat_1="MOBA" cat_2="Acción" id="12345" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Apex Legends" cat_1="Shooter" cat_2="Battle Royale" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Battlefield 4" cat_1="Shooter" cat_2="Acción" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Skyrim" cat_1="Rol" cat_2="Aventura" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Crash Team Racing" cat_1="Carreras" cat_2="Plataformas" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="League of Legends" cat_1="MOBA" cat_2="Acción" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Apex Legends" cat_1="Shooter" cat_2="Battle Royale" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Battlefield 4" cat_1="Shooter" cat_2="Acción" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Skyrim" cat_1="Rol" cat_2="Aventura" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Crash Team Racing" cat_1="Carreras" cat_2="Plataformas" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="League of Legends" cat_1="MOBA" cat_2="Acción" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Apex Legends" cat_1="Shooter" cat_2="Battle Royale" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Battlefield 4" cat_1="Shooter" cat_2="Acción" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Skyrim" cat_1="Rol" cat_2="Aventura" />
                                <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Crash Team Racing" cat_1="Carreras" cat_2="Plataformas" />
                            </StyledCarousel>
                        </Grid>
                    </Stack>
                </Paper>

            </Grid>


        </Fragment>

    )
}
