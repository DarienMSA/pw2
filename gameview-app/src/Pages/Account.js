import { Avatar, Button, Chip, Divider, Grid, IconButton, Paper, Snackbar, styled, ThemeProvider, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { Fragment, useEffect, useState } from 'react'
import ActiveGame from '../Components/Account/ActiveGame';
import Gamecollection from '../Components/Home/GameCollection';
import CardGame from '../Components/CardGame';
import Carousel from 'react-elastic-carousel';
import btheme from '../Components/GameView-Theme';
import { useLocation, useNavigate } from 'react-router-dom';
import LoggedBar from '../Components/loggedBar';
import UnloggedBar from '../Components/unloggedBar';
import { GetUser } from '../Services/UserServices';



export default function Account() {
    const navigate = useNavigate();
    const [openDiscordMessage, setOpenDiscordMessage] = React.useState(false);
    const { search } = useLocation();
    const searchParams = new URLSearchParams((search));
    const session = localStorage.getItem("UserSession");


    const [user, setUser] = useState({})
    const [userSocial, setUserSocial] = useState({})
    const [discordMessage, setDiscordMessage] = useState("");

    useEffect(() => {
        if (session === null) {
            navigate("/")
        } else {
            async function getUser() {
                let id;
                if (searchParams.has("u"))
                    id = searchParams.get("u");
                else
                    id = session;

                const data = await GetUser(id);
                if (data.birthday === null)
                    data.birthday = "";

                setUser(data);
                setUserSocial(data.social);
                if (data.email) {
                    if (data.social.discord !== "")
                        setDiscordMessage("La cuenta se ha copiado en el portapapeles (" + data.social.discord + ")")
                    else
                        setDiscordMessage("El usuario no tiene disponible su cuenta de Discord");
                } else {
                    navigate("/")
                }
            }
            getUser();
        }



    }, []);



    const navigateFunction = url => () => {
        navigate(url);

    };

    const handleClick = d => () => {
        if (d != "") {
            navigator.clipboard.writeText(d);
        }
        setOpenDiscordMessage(true);

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDiscordMessage(false);
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

    const onClickSocialMedia = url => () => {
        if (url !== "")
            window.open(url, '_blank');
    }

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

    return (
        <ThemeProvider theme={btheme}>
            {session !== null ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
            <Grid container direction="row" >
                <Grid container item xs={12} md={3} direction={"column"} sx={{
                    borderRightWidth: "5px", borderTopWidth: "0px", borderBottomWidth: "0px", borderLeftWidth: "0px",
                    borderColor: "#1A374D", borderStyle: "solid"
                }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item mt={5} >

                        <ProfileImg src={user.profilePic}></ProfileImg>

                    </Grid>

                    <Grid item mb={5} mt={5} textAlign={"center"}>
                        <Typography mb={2} mt={2}>Correo: </Typography> <Typography display="inline" fontWeight={"bold"}> {user.email} </Typography>
                        <Typography mb={2} mt={2}>Juegos Reseñados: </Typography> <Typography display="inline" fontWeight={"bold"}>23 </Typography>
                        {
                            user.birthday != "" ? <Fragment> <Typography mb={2} mt={2}>Fecha de nacimiento: </Typography> <Typography display="inline" fontWeight={"bold"}>{user.birthday} </Typography> </Fragment> : <Typography sx={{ display: "none" }}></Typography>
                        }

                    </Grid>


                    <Paper elevation={6} sx={{ minWidth: "100px", borderRadius: 16 }} >
                        <Grid container direction={"row"}
                            alignItems="center" justifyContent="center"
                        >
                            <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                                alignItems="center">
                                <SocialMedia onClick={onClickSocialMedia(userSocial.facebook)} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"></SocialMedia>
                            </Grid>
                            <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                                alignItems="center">
                                <SocialMedia onClick={onClickSocialMedia(userSocial.twitter)} src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"></SocialMedia>
                            </Grid>
                            <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                                alignItems="center">
                                <SocialMedia onClick={onClickSocialMedia(userSocial.instagram)} src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png"></SocialMedia>
                            </Grid>
                            <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                                alignItems="center">
                                <SocialMedia onClick={handleClick(userSocial.discord)} src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-7-1.png"></SocialMedia>
                                <Snackbar
                                    open={openDiscordMessage}
                                    autoHideDuration={6000}
                                    onClose={handleClose}
                                    message={discordMessage}
                                    action={action}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {searchParams.has("u") || (
                        <Grid item mt={5} mb={5}>
                            <Button fullWidth variant={"contained"} color="warning" onClick={navigateFunction("/account/update")}>Modificar</Button>
                        </Grid>
                    )}




                </Grid>

                <Grid container item xs={12} md={9} paddingLeft={3} direction="row">

                    <Grid item xs={12}>
                        <Typography variant='h2' textAlign={"center"} mt={3} fontWeight={"bold"} fontSize={50} >{user.name}</Typography>
                        <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px" }}> <Chip label="DESCRIPCIÓN" /> </Divider>

                        {
                            user.desc != "" ? <Fragment><Typography variant="h6" textAlign={"center"} > {user.desc} </Typography></Fragment>
                                : <Fragment><Typography variant="caption" component={"h6"} textAlign={"center"} > No hay descripción. </Typography></Fragment>
                        }

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
        </ThemeProvider>
    )
}
