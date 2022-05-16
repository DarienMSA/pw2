import { Avatar, Checkbox, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Box, Button, CardMedia, Chip, Divider, FormControlLabel, FormGroup, Grid, Modal, Rating, styled, Switch, TextField, Typography, Stack, ThemeProvider, Collapse, Alert } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useEffect, useRef, useState } from 'react'
import ActiveUsers from '../Components/ShowGame/ActiveUsers';
import Review from '../Components/ShowGame/Review';
import btheme from '../Components/GameView-Theme';
import { useLocation, useNavigate } from 'react-router-dom';

import LoggedBar from '../Components/loggedBar';
import UnloggedBar from '../Components/unloggedBar';
import { GetUser, GetUserEmail } from '../Services/UserServices';
import { AddActiveUser, GetGameID, IsUserActive, RemoveActiveUser } from '../Services/GameServices';
import { CreateReview, DeleteReview, GetGameReviews, GetGameScores, GetReviewUserGame, UpdateReview } from '../Services/ReviewServices';
import { useAuth0 } from '@auth0/auth0-react';
import { CreateUserBadges, DeleteUserBadges, GetAllBadges, GetUserGameBadges, UpdateUserGameBadges } from '../Services/BadgeServices';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 720,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "1%",
};
const GameImage = styled(CardMedia)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        height: "400px",
        width: "400px"
    },
    [theme.breakpoints.up('md')]: {
        height: "400px",
        width: "250px",
        marginRight: 50

    },
    [theme.breakpoints.up('lg')]: {
        height: "400px",
        width: "300px",
        marginTop: 40
    },

}));

const BoxModalActiveGames = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #000',
    boxShadow: 24,
    padding: 4,

    [theme.breakpoints.down('md')]: {
        width: 400,
    },
    [theme.breakpoints.up('md')]: {
        width: 600,

    },
    [theme.breakpoints.up('lg')]: {
        width: 1000,
    },

}));

const StyledStack = styled(Stack)(({ theme }) => ({

    [theme.breakpoints.down('md')]: {
        width: "auto",
    },
    [theme.breakpoints.up('md')]: {
        width: "auto",

    },
    [theme.breakpoints.up('lg')]: {
        width: "auto",
    },

}));


export default function ShowGame() {
    const [value, setValue] = useState(4);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    const { search } = useLocation();
    const searchParams = new URLSearchParams((search));
    const [userDB, setUserDB] = useState({});
    const { user, isLoading, isAuthenticated } = useAuth0();
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])
    const [openAlertModifReview, setOpenAlertModifReview] = useState(false);
    const [textAlertModifReview, setTextAlertModifReview] = useState("");
    const [openAlertCreateReview, setOpenAlertCreateReview] = useState(false);
    const [textAlertCreateReview, setTextAlertCreateReview] = useState("");
    const [userReview, setUserReview] = useState({
        gameId: searchParams.get("id"),
        userId: "",
        content: "",
        date: "",
        score: 1
    })
    const [userBadges, setUserBadges] = useState({
        gameId: searchParams.get("id"),
        userId: "",
        badges: []
    })
    const [userHasReview, setUserHasReview] = useState(false)
    const [badges, setBadges] = useState([]);
    const [counter, setCounter] = useState(0);
    const [scores, setScores] = useState({
        "zeroStars": 0,
        "OneStars": 0,
        "twoStars": 0,
        "threeStars": 0,
        "fourStars": 0,
        "fiveStars": 0
    })
    const [switchActiveGame, setSwitchActiveGame] = useState(false)
    async function getUser() {

        const data = await GetUserEmail(user.email);

        if (data.email) {
            userActive(data._id)
            setUserDB(data);
        } else {
            navigate("/")
        }
    }
    async function getScores() {
        const data = await GetGameScores(searchParams.get("id"))
        setScores(data)
    }
    async function getBadges() {
        const data = await GetAllBadges();

        if (data.length != 0)
            setBadges(data)
    }
    async function getUserGameReview() {

        const data = await GetReviewUserGame(searchParams.get("id"), user.email);
        if (data.content) {
            setUserReview(data);
            setUserHasReview(true);

        } else {
            setUserHasReview(false);
            setUserReview({
                ...userReview,
                userId: user.email
            })
        }
    }

    async function getReviews() {

        const data = await GetGameReviews(searchParams.get("id"));
        setReviews(data)
    }

    async function getUserGameBadges() {

        const data = await GetUserGameBadges(user.email, searchParams.get("id"));
        if (data.gameId) {

            setUserBadges(data);

        } else {
            setUserBadges({
                ...userBadges,
                userId: user.email
            })
        }
    }
    async function getGame() {

        const data = await GetGameID(searchParams.get("id"));
        console.log(game);
        if (data.launchDate) {
            setGame(data);

        } else {
            navigate("/")
            console.log(data)
        }
    }

    async function userActive(idUser) {
        const data = await IsUserActive(searchParams.get("id"), idUser)
        setSwitchActiveGame(data)
    }

    useEffect(() => {
        if (!isLoading) {

            if (!isAuthenticated) {
                navigate("/")
            }

            getGame();
            getBadges();
            getReviews();
            getScores();
            if (isAuthenticated) {
                getUser();
                getUserGameReview();
                getUserGameBadges();



            }

        }

    }, [isLoading, counter, searchParams.get("id")]);

    if (!Object.keys(game).length) return (<h1></h1>)


    const navigateFunction = url => () => {
        navigate(url)
    };

    const handleSwitchToggle = (e) => {
        if (e.target.checked) {
            async function addActive() {
                const data = await AddActiveUser(searchParams.get("id"), userDB._id)
                console.log("AddData: ", data)
            }
            addActive();
        } else {
            async function removeActive() {
                const data = await RemoveActiveUser(searchParams.get("id"), userDB._id)
                console.log("RemoveData: ", data)
            }
            removeActive();
        }
        setSwitchActiveGame(e.target.checked)
        setCounter((c) => c + 1)
    };

    const handleToggle = (value) => () => {
        //userBadges.badges.filter(e => e.name === badge.name).length === 1
        //const currentIndex = userBadges.badges.indexOf(value);
        const exists = userBadges.badges.filter(e => e.name === value.name).length
        const index = userBadges.badges.indexOf(value);
        const newChecked = [...userBadges.badges];
        if (exists === 0) {
            newChecked.push(value);
        } else {
            newChecked.splice(index, 1);
        }
        setUserBadges({
            ...userBadges,
            badges: newChecked

        })
        //setChecked(newChecked);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserReview({
            ...userReview,
            [name]: value
        })
    }

    const processReview = () => {
        async function postReview() {
            console.log("userReview: ", userReview)
            const data = await CreateReview(userReview);
            console.log(data)
            if (data.newReview.content) {
                setUserReview(data.newReview);
                setUserHasReview(true);
                setGame({
                    ...game,
                    score: data.newScore
                })

                let aux = userBadges;
                aux = {
                    ...aux,
                    badges: []
                };
                for (let index = 0; index < userBadges.badges.length; index++) {
                    aux.badges.push(userBadges.badges[index]._id);

                }
                const dataBadges = await CreateUserBadges(aux)
                if (dataBadges.userId) {
                    setUserBadges(dataBadges)
                    getReviews();
                    setOpen2(false);
                }

            } else {
                setUserHasReview(false);
            }
        }
        setOpenAlertCreateReview(false)
        if (userBadges.badges.length == 0) {
            setTextAlertCreateReview("Introduce por lo menos una medalla.");
            setOpenAlertCreateReview(true)
        } else if (userReview.content.length === 0) {
            setTextAlertCreateReview("Debes de escribir para publicar tu reseña.");
            setOpenAlertCreateReview(true)
        } else if (userReview.score > 5 || userReview.score < 1) {
            setTextAlertCreateReview("Solo puedes puntuar entre 1 y 5");
            setOpenAlertCreateReview(true)
        } else {
            postReview();
        }


    }

    const deleteReview = () => {
        async function delReview() {
            console.log("userReview: ", userReview)
            const data = await DeleteReview(userReview._id);
            console.log("data: ", data);
            await DeleteUserBadges(userBadges._id);

            setUserReview({
                gameId: searchParams.get("id"),
                userId: user.email,
                content: "",
                date: "",
                score: 1
            })
            setUserBadges({
                gameId: searchParams.get("id"),
                userId: user.email,
                badges: []
            })
            setUserHasReview(false)
            setGame({
                ...game,
                score: data.newScore
            })
            getReviews();
            setOpen3(false);
        }
        //console.log("userReview: ", userReview)
        delReview();
    }

    const updateProcessReview = () => {
        async function putReview() {
            const data = await UpdateReview(userReview, userReview._id);

            if (data.data.content) {
                setUserReview(data.data);
                setUserHasReview(true);

                setGame({
                    ...game,
                    score: data.newScore
                })

                let aux = userBadges;
                aux = {
                    ...aux,
                    badges: []
                };
                for (let index = 0; index < userBadges.badges.length; index++) {
                    aux.badges.push(userBadges.badges[index]._id);

                }

                const dataBadges = await UpdateUserGameBadges(userBadges._id, aux)
                //const dataBadges = await CreateUserBadges(aux)
                getReviews();
                setOpen3(false);
                if (dataBadges.data.userId) {

                    setUserBadges(dataBadges.data)
                    setCounter((c) => c + 1)
                }
            }
        }

        setOpenAlertModifReview(false)
        if (userBadges.badges.length == 0) {
            setTextAlertModifReview("Introduce por lo menos una medalla.");
            setOpenAlertModifReview(true)
        } else if (userReview.content.length === 0) {
            setTextAlertModifReview("Debes de escribir para publicar tu reseña.");
            setOpenAlertModifReview(true)
        } else if (userReview.score > 5 || userReview.score < 1) {
            setTextAlertModifReview("Solo puedes puntuar entre 1 y 5");
            setOpenAlertModifReview(true)
        } else {
            putReview();
        }
    }
    //
    return (
        <ThemeProvider theme={btheme}>
            {isAuthenticated ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
            <Grid container>
                <Grid container item xs={12} justifyContent={"center"} >
                    <Grid item container xs={12} md={3} justifyContent={"center"} alignItems={"center"} my={5} >
                        <Box item>
                            <GameImage
                                component="img"
                                image={game.image}
                                alt="green iguana"
                            />
                        </Box>
                        <Box mt={5} width={"100%"} textAlign="center" >
                            <Typography component="legend" fontWeight={"bold"}>Puntuación: {game.score}</Typography>
                            <Rating size="large" precision={0.5} sx={{ borderColor: "white" }} name="read-only" value={game.score} readOnly
                                emptyIcon={
                                    <StarBorderIcon fontSize="inherit" />
                                } />
                        </Box>
                    </Grid>
                    <Grid item container xs={12} md={6} my={5} direction="row">
                        <Grid item xs={12}>
                            <Typography variant='h2' textAlign={"left"} mt={3} fontWeight={"bold"} style={{ fontFamily: 'Ubuntu' }}>{game.name}</Typography>
                            <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px", background: "gray" }}> </Divider>
                            <Typography mb={2} variant="h6" component={"h1"} >{game.studio} - {game.launchDate}</Typography>
                            <StyledStack sx={{ overflow: "auto", paddingBottom: 2 }} direction={"row"} spacing={.5}>
                                {
                                    game.genres.map((genre, index) => (
                                        <Chip key={genre._id} color="info" onClick={navigateFunction("/browse?c=" + genre._id)} label={genre.name} />
                                    ))
                                }
                            </StyledStack>

                            <Typography variant="h6" textAlign={"left"} my={3}> {game.synopsis} </Typography>
                        </Grid>
                        <Grid item container xs={12} justifyContent="flex-end" alignItems="flex-end">

                            {
                                (userHasReview && isAuthenticated) || (
                                    <Button onClick={handleOpen2} sx={{ marginRight: "30px", marginY: 1 }} variant="contained" color="warning" endIcon={<AddCircleIcon />}>Crear Reseña</Button>
                                )

                            }
                            {
                                (userHasReview && isAuthenticated) && (
                                    <Button onClick={handleOpen3} sx={{ marginRight: "30px", marginY: 1 }} variant="contained" color="warning" endIcon={<AddCircleIcon />}>Modificar Reseña</Button>
                                )
                            }


                            <Modal
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="title-review">
                                <Box sx={style}>
                                    <Typography my={2.5} id="title-review" variant="h5" component="h2">
                                        Reseña y puntúa el juego
                                    </Typography>
                                    <Grid container alignItems="center" justifyContent="center">
                                        <List dense sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', maxHeight: 200, overflow: "auto", overflowX: "hidden" }}>
                                            {badges.map((badge, index) => {
                                                const labelId = `checkbox-list-secondary-label-${index}`;
                                                return (
                                                    <ListItem
                                                        key={index}
                                                        secondaryAction={
                                                            <Checkbox
                                                                edge="end"
                                                                onChange={handleToggle(badge)}
                                                                checked={userBadges.badges.filter(e => e.name === badge.name).length === 1}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        }
                                                        disablePadding
                                                    >
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    alt={`${badge.name}: ${badge.desc}`}
                                                                    src={badge.image}
                                                                />
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={`${badge.name}: ${badge.desc}`} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>

                                    </Grid>
                                    <TextField onChange={handleOnChange} name="content" fullWidth id="outlined-basic" multiline rows={4} autoComplete='none' variant="outlined" sx={{ mt: 1.5, mb: 2 }} />
                                    <TextField
                                        id="date"
                                        label="¿Cuándo terminaste el juego? (opcional)"
                                        type="date"
                                        color={"info"}
                                        onChange={handleOnChange}
                                        name="date"
                                        defaultValue="2017-05-24"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Grid container justifyContent="-moz-initial" mt={2}>
                                        <Grid item xs={10}>
                                            <Rating precision={1} max={5} onChange={handleOnChange} name="score" value={userReview.score} size="large" />
                                        </Grid>
                                        <Grid item xs={2} sx={{
                                            display: "flex",
                                            flexDirection: 'row-reverse'
                                        }}>
                                            <Button color="buttonPrimary" onClick={processReview} sx={{ color: "#FFF2EF" }} variant="contained">Publicar</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Collapse in={openAlertCreateReview}>
                                                <Alert id="alert-create" variant="filled" severity="warning" sx={{ mt: 2 }}> {textAlertCreateReview} </Alert>
                                            </Collapse>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>
                            <Modal
                                open={open3}
                                onClose={handleClose3}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h5" component="h2">
                                        Modifica tu Reseña
                                    </Typography>
                                    <Grid container alignItems="center" justifyContent="center">
                                        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 200, overflow: "auto", overflowX: "hidden" }}>
                                            {badges.map((badge, index) => {
                                                const labelId = `checkbox-list-secondary-label-${index}`;
                                                return (
                                                    <ListItem
                                                        key={index}
                                                        secondaryAction={
                                                            <Checkbox
                                                                edge="end"
                                                                onChange={handleToggle(badge)}
                                                                checked={userBadges.badges.filter(e => e.name === badge.name).length === 1}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        }
                                                        disablePadding
                                                    >
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    alt={`${badge.name}: ${badge.desc}`}
                                                                    src={badge.image}
                                                                />
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={`${badge.name}: ${badge.desc}`} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </Grid>
                                    <TextField onChange={handleOnChange} name="content" fullWidth id="outlined-basic" multiline value={userReview.content} rows={4} autoComplete='none' variant="outlined" sx={{ mt: 1.5, mb: 2 }} />
                                    <TextField
                                        id="date"
                                        label="¿Cuándo terminaste el juego? (opcional)"
                                        onChange={handleOnChange}
                                        type="date"
                                        name="date"
                                        color={"info"}
                                        defaultValue={userReview.date}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Grid container justifyContent="-moz-initial" mt={2}>
                                        <Grid item xs={6}>

                                            <Rating precision={1} onChange={handleOnChange} name="score" value={userReview.score} size="large" />
                                        </Grid>
                                        <Grid item xs={6} sx={{
                                            display: "flex",
                                            flexDirection: 'row-reverse'
                                        }}>
                                            <Button variant="contained" onClick={deleteReview} color="error" sx={{ color: "#FFF2EF" }}>Eliminar</Button>
                                            <Button variant="contained" onClick={updateProcessReview} color="buttonPrimary" sx={{ color: "#FFF2EF", marginRight: 5 }}>Actualizar</Button>


                                        </Grid>
                                        <Grid item xs={12}>
                                            <Collapse in={openAlertModifReview}>
                                                <Alert id="alert-modif" variant="filled" severity="warning" sx={{ mt: 2 }}> {textAlertModifReview} </Alert>
                                            </Collapse>
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Modal>
                            <Button sx={{ marginRight: "30px", marginY: 1, color: "#FFF2EF" }} onClick={handleOpen} variant="contained" color="buttonPrimary" endIcon={<SearchIcon />}>Buscar jugadores</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"

                            >
                                <BoxModalActiveGames sx={{ background: "#1A374D" }}>
                                    <Typography color={"#FFF2EF"} textAlign={"center"} id="modal-modal-title" variant="h5" component="h2" my={3}>
                                        Buscando jugadores para Elden Ring
                                    </Typography>
                                    <Divider sx={{ marginY: "15px" }} variant="middle"></Divider>
                                    <Grid container id="modal-modal-description" sx={{ my: 2 }}>
                                        <Grid item container xs={12} md={12} lg={4} justifyContent="center" alignItems={"center"}
                                        >
                                            <FormGroup>
                                                <FormControlLabel control={<Switch onChange={handleSwitchToggle} color={"buttonPrimary"} checked={switchActiveGame} />} label={<span style={{ color: '#FFF2EF' }}>Quiero buscar jugadores</span>} />
                                            </FormGroup>
                                            <Typography color={"#FFF2EF"} width={"80%"} sx={{ my: 10 }}>
                                                Estos son los usuarios que buscan tener una partida en Elden Ring, comunícate con ellos por sus redes sociales o enviándoles un mensaje
                                            </Typography>

                                        </Grid>

                                        <Grid item container xs={12} md={12} lg={8} justifyContent="center" alignItems={"center"} sx={{ maxHeight: "470px", overflow: "auto" }}>
                                            {
                                                game.activeUsers.map((user, index) => (
                                                    <ActiveUsers key={index} user={user}></ActiveUsers>
                                                ))
                                            }

                                        </Grid>
                                    </Grid>
                                </BoxModalActiveGames>
                            </Modal>
                        </Grid>




                    </Grid>

                </Grid>

                <Grid container item xs={12} md={6} justifyContent={"center"} alignItems={"center"}>

                    <Box sx={{
                        '& > legend': { mt: 1 },
                    }}>
                        <Typography variant={"h5"} fontWeight={"bold"} textAlign={"center"}>Total de Puntuaciones</Typography>
                        <Typography component="legend" textAlign={"center"}>{scores.fiveStars}</Typography>
                        <Rating name="read-only" value={5} readOnly />

                        <Typography component="legend" textAlign={"center"}>{scores.fourStars}</Typography>
                        <Rating name="read-only" value={4} readOnly />

                        <Typography component="legend" textAlign={"center"}>{scores.threeStars}</Typography>
                        <Rating name="read-only" value={3} readOnly />

                        <Typography component="legend" textAlign={"center"}>{scores.twoStars}</Typography>
                        <Rating name="read-only" value={2} readOnly />

                        <Typography component="legend" textAlign={"center"}>{scores.OneStars}</Typography>
                        <Rating name="read-only" value={1} readOnly />

                    </Box>
                </Grid>

                {
                    userHasReview && (
                        <Grid container item xs={12} md={6} justifyContent={"center"} alignItems={"center"} mt={5}>

                            <Box sx={{
                                '& > legend': { mt: 1 },
                            }}>
                                <Typography variant={"h5"} fontWeight={"bold"} textAlign={"center"}>Tu reseña.</Typography>
                                <Review r={userReview} actualUser={userDB}></Review>


                            </Box>
                        </Grid>
                    )
                }


                <Grid container item xs={12} justifyContent={"center"} alignItems={"center"} mt={10}>
                    <Typography variant={"h5"} fontWeight={"bold"} textAlign={"center"}>Todas las reseñas.</Typography>
                </Grid>

                <Grid container item xs={12} justifyContent={"center"} alignItems={"center"} my={2}>

                    {
                        reviews.map((review, index) => (
                            <Review key={index} r={review} actualUser={userDB}></Review>
                        ))
                    }
                </Grid>

            </Grid>
        </ThemeProvider>
    )
}