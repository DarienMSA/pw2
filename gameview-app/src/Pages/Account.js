import { Avatar, Button, Chip, Divider, Grid, IconButton, Paper, Snackbar, styled, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import ActiveGame from '../Components/Account/ActiveGame';
import Gamecollection from '../Components/Home/GameCollection';
import CardGame from '../Components/CardGame';
import Carousel from 'react-elastic-carousel';

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

const CbreakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3, itemsToScroll: 3 },
    { width: 768, itemsToShow: 4, itemsToScroll: 4 },
    { width: 960, itemsToShow: 5, itemsToScroll: 5 },
    { width: 1200, itemsToShow: 6, itemsToScroll: 6 }
]

const CbreakPointsActive = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3, itemsToScroll: 3 },
    { width: 960, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1200, itemsToShow: 5, itemsToScroll: 5 }
]

export default function Account() {

    const [open, setOpen] = React.useState(false);

    const handleClick = d => () => {
        console.log(d);
        navigator.clipboard.writeText(d);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const ProfileImg = styled(Avatar)(({ theme }) => ({
        [theme.breakpoints.down('md')]: {
            width: "300px", height: "300px"
        },
        [theme.breakpoints.up('md')]: {
            width: "200px", height: "200px"
        },
        [theme.breakpoints.up('lg')]: {
            width: "250px", height: "250px"
        },

    }));

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const SocialMedia = styled(Avatar)(({ theme }) => ({
        width: "100px", height: "100px",
        borderRadius: 16,

        '&:hover': {
            cursor: "pointer"
        },
    }));

    return (
        <Grid container direction="row" >
            <Grid container item xs={12} md={3} direction={"column"} sx={{
                borderRightWidth: "5px", borderTopWidth: "0px", borderBottomWidth: "0px", borderLeftWidth: "0px",
                borderColor: "#1A374D", borderStyle: "solid"
            }}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item mt={5} >
                    <ProfileImg src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg"></ProfileImg>
                </Grid>

                <Grid item mb={5} mt={5}>
                    <Typography mb={2} mt={2}>Correo: <Typography display="inline" fontWeight={"bold"}>sadarien@gmail.com </Typography></Typography>
                    <Typography mb={2} mt={2}>Juegos Reseñados: <Typography display="inline" fontWeight={"bold"}>23 </Typography></Typography>
                    <Typography mb={2} mt={2}>Fecha de nacimiento: <Typography display="inline" fontWeight={"bold"}>1998/09/19 </Typography></Typography>
                </Grid>


                <Paper elevation={6} sx={{ minWidth: "100px", borderRadius: 16 }} >
                    <Grid container direction={"row"}
                        alignItems="center" justifyContent="center"
                    >
                        <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                            alignItems="center">
                            <SocialMedia src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"></SocialMedia>
                        </Grid>
                        <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                            alignItems="center">
                            <SocialMedia src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"></SocialMedia>
                        </Grid>
                        <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                            alignItems="center">
                            <SocialMedia src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png"></SocialMedia>
                        </Grid>
                        <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                            alignItems="center">
                            <SocialMedia onClick={handleClick("Daze#7023")} src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-7-1.png"></SocialMedia>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                message="La cuenta se ha copiado en el portapapeles (Daze#7023)"
                                action={action}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Grid item mt={5} mb={5}>
                    <Button fullWidth variant={"contained"} color="warning">Modificar</Button>
                </Grid>


            </Grid>

            <Grid container item xs={12} md={9} paddingLeft={3} direction="row">

                <Grid item xs={12}>
                    <Typography variant='h2' textAlign={"center"} mt={3} fontWeight={"bold"} fontSize={50} >Darien Miguel Sánchez Arévalo</Typography>
                    <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px" }}> <Chip label="DESCRIPCIÓN" /> </Divider>
                    <Typography variant="h6" textAlign={"center"} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim dui, a sodales turpis volutpat vel. In ornare, felis non sagittis cursus, magna risus tristique ex, non porttitor est nisl ut lectus. Morbi vulputate nibh est, id ultricies orci pharetra tincidunt. Nunc nibh elit, ultrices sit amet augue eu, viverra consequat erat.</Typography>
                    <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px" }}> <Chip label="JUEGOS RESEÑADOS" /> </Divider>
                    <Grid container direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <StyledCarousel className='styling-example' breakPoints={CbreakPoints}>
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
                            <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="League of Legends" cat_1="MOBA" cat_2="Acción" />
                            <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Apex Legends" cat_1="Shooter" cat_2="Battle Royale" />
                            <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Battlefield 4" cat_1="Shooter" cat_2="Acción" />
                            <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Skyrim" cat_1="Rol" cat_2="Aventura" />
                            <CardGame image="https://cdn.game.tv/game-tv-content/images_3/9bd33486b9989e211af34682144ea9a3/GameTile.jpg" tittle="Crash Team Racing" cat_1="Carreras" cat_2="Plataformas" />
                        </StyledCarousel>
                    </Grid>
                    <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px" }}> <Chip label="JUEGOS ACTIVOS" /> </Divider>
                    <Grid container direction="row"
                        justifyContent="center"
                        alignItems="center"
                        marginBottom={5}>
                        <StyledCarousel breakPoints={CbreakPointsActive}>
                            <ActiveGame></ActiveGame>
                            <ActiveGame></ActiveGame>
                            <ActiveGame></ActiveGame>
                            <ActiveGame></ActiveGame>
                            <ActiveGame></ActiveGame>
                            <ActiveGame></ActiveGame>
                            <ActiveGame></ActiveGame>
                            <ActiveGame></ActiveGame>
                            <ActiveGame></ActiveGame>
                        </StyledCarousel>


                    </Grid>
                </Grid>


            </Grid>

        </Grid>
    )
}
