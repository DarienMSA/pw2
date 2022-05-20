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
import { GetUser, GetUserEmail } from '../Services/UserServices';
import { useAuth0 } from '@auth0/auth0-react';
import { GetUserReviews } from '../Services/ReviewServices';
import { GetUserActiveGames } from '../Services/GameServices';
import facebookImage from '../Assets/facebook.png';
import instagramImage from '../Assets/instagram.png';
import twitterImage from '../Assets/twitter.png';
import discordImage from '../Assets/discord.png';



export default function Account() {
    const navigate = useNavigate();
    const [openDiscordMessage, setOpenDiscordMessage] = React.useState(false);
    const { search } = useLocation();
    const searchParams = new URLSearchParams((search));


    const { user, isLoading, isAuthenticated } = useAuth0();
    const [userDB, setUserDB] = useState({});
    const [reviews, setReviews] = useState([])
    const [activeGames, setActiveGames] = useState([])
    const [discordMessage, setDiscordMessage] = useState("");

    async function getUserReviews(id) {
        const data = await GetUserReviews(id);
        setReviews(data);
    }

    async function getUserActiveGames(id) {

        const data = await GetUserActiveGames(id);
        setActiveGames(data);
    }


    useEffect(() => {

        if (!isLoading) {


            if (!isAuthenticated) {
                navigate("/")
            }

            if (!searchParams.has("u")) {

                async function getActualUser() {
                    const data = await GetUserEmail(user.email);
                    if (data.email) {
                        if (data.birthday === null)
                            data.birthday = "";
                        setUserDB(data);

                        if (data.social.discord !== "")
                            setDiscordMessage("La cuenta se ha copiado en el portapapeles (" + data.social.discord + ")")
                        else
                            setDiscordMessage("El usuario no tiene disponible su cuenta de Discord");
                        getUserReviews(data.email)
                        getUserActiveGames(data._id)
                    } else {

                    }
                }
                getActualUser();
            } else if (searchParams.has("u")) {
                async function getParamUser() {
                    const data = await GetUserEmail(searchParams.get("u"));

                    if (data.email) {
                        if (data.birthday === null)
                            data.birthday = "";
                        setUserDB(data);

                        if (data.social.discord !== "")
                            setDiscordMessage("La cuenta se ha copiado en el portapapeles (" + data.social.discord + ")")
                        else
                            setDiscordMessage("El usuario no tiene disponible su cuenta de Discord");
                        getUserReviews(data.email)
                        getUserActiveGames(data._id)
                    } else {
                        navigate("/")
                    }
                }
                getParamUser();
            }

        }

    }, [isLoading]);

    if (!Object.keys(userDB).length && !Object.keys(reviews).length) return (<h1></h1>)



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
            {isAuthenticated ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
            <Grid container direction="row" >
                <Grid container item xs={12} md={3} direction={"column"} sx={{
                    borderRightWidth: "5px", borderTopWidth: "0px", borderBottomWidth: "0px", borderLeftWidth: "0px",
                    borderColor: "#1A374D", borderStyle: "solid"
                }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item mt={5} >

                        <ProfileImg src={userDB.profilePic}></ProfileImg>

                    </Grid>

                    <Grid item mb={5} mt={5} textAlign={"center"}>
                        <Typography mb={2} mt={2}>Correo: </Typography> <Typography display="inline" fontWeight={"bold"}> {userDB.email} </Typography>
                        <Typography mb={2} mt={2}>Juegos Reseñados: </Typography> <Typography display="inline" fontWeight={"bold"}>{reviews.length} </Typography>
                        {
                            userDB.birthday != "" ? <Fragment> <Typography mb={2} mt={2}>Fecha de nacimiento: </Typography> <Typography display="inline" fontWeight={"bold"}>{userDB.birthday} </Typography> </Fragment> : <Typography sx={{ display: "none" }}></Typography>
                        }

                    </Grid>


                    <Paper elevation={6} sx={{ minWidth: "100px", borderRadius: 16 }} >
                        <Grid container direction={"row"}
                            alignItems="center" justifyContent="center"
                        >
                            <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                                alignItems="center">
                                <SocialMedia onClick={onClickSocialMedia(userDB.social.facebook)} src={facebookImage}></SocialMedia>
                            </Grid>
                            <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                                alignItems="center">
                                <SocialMedia onClick={onClickSocialMedia(userDB.social.twitter)} src={twitterImage}></SocialMedia>
                            </Grid>
                            <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                                alignItems="center">
                                <SocialMedia onClick={onClickSocialMedia(userDB.social.instagram)} src={instagramImage}></SocialMedia>
                            </Grid>
                            <Grid container item xs={6} md={12} lg={6} justifyContent="center" mt={5} mb={5}
                                alignItems="center">
                                <SocialMedia onClick={handleClick(userDB.social.discord)} src={discordImage}></SocialMedia>
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
                        <Typography variant='h2' textAlign={"center"} mt={3} fontWeight={"bold"} fontSize={50} >{userDB.name}</Typography>
                        <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px" }}> <Chip label="DESCRIPCIÓN" /> </Divider>

                        {
                            userDB.desc != "" ? <Fragment><Typography variant="h6" textAlign={"center"} > {userDB.desc} </Typography></Fragment>
                                : <Fragment><Typography variant="caption" component={"h6"} textAlign={"center"} > No hay descripción. </Typography></Fragment>
                        }

                        <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px" }}> <Chip label="JUEGOS RESEÑADOS" /> </Divider>
                        <Grid container direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <StyledCarousel className='styling-example' breakPoints={CbreakPoints}>
                                {
                                    reviews.map((review, index) => (
                                        <CardGame key={index} g={review.gameId} cat_1="MOBA" cat_2="Acción" />
                                    ))
                                }
                            </StyledCarousel>
                        </Grid>
                        <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px" }}> <Chip label="JUEGOS ACTIVOS" /> </Divider>
                        <Grid container direction="row"
                            justifyContent="center"
                            alignItems="center"
                            marginBottom={5}>
                            <StyledCarousel breakPoints={CbreakPointsActive}>
                                {
                                    activeGames.map((game, index) => (
                                        <ActiveGame key={index} game={game}></ActiveGame>
                                    ))
                                }

                            </StyledCarousel>


                        </Grid>
                    </Grid>


                </Grid>

            </Grid>
        </ThemeProvider>
    )
}
