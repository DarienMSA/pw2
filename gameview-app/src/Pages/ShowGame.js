import { Avatar, Checkbox, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Box, Button, CardMedia, Chip, Divider, FormControlLabel, FormGroup, Grid, Modal, Rating, styled, Switch, TextField, Typography, Stack, ThemeProvider } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState } from 'react'
import ActiveUsers from '../Components/ShowGame/ActiveUsers';
import Review from '../Components/ShowGame/Review';
import btheme from '../Components/GameView-Theme';
import { useNavigate } from 'react-router-dom';

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
        height: "200px",
        width: "200px",
        marginRight: 50

    },
    [theme.breakpoints.up('lg')]: {
        height: "300px",
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

    const [checked, setChecked] = React.useState([1]);

    const navigateFunction = url => () => {
        navigate(url)
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    //
    return (
        <ThemeProvider theme={btheme}>
            <Grid container>
                <Grid container item xs={12} m={5} justifyContent={"center"} >
                    <Grid item container xs={12} md={3} justifyContent={"center"} alignItems={"center"} my={5} >
                        <Box item>
                            <GameImage
                                component="img"
                                image="https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png"
                                alt="green iguana"
                            />
                        </Box>
                        <Box mt={5} width={"100%"} textAlign="center" >
                            <Typography component="legend" fontWeight={"bold"}>Puntuación: 4.1</Typography>
                            <Rating size="large" precision={0.5} sx={{ borderColor: "white" }} name="read-only" value={value} readOnly
                                emptyIcon={
                                    <StarBorderIcon fontSize="inherit" />
                                } />
                        </Box>
                    </Grid>
                    <Grid item container xs={12} md={6} my={5} direction="row">
                        <Grid item xs={12}>
                            <Typography variant='h2' textAlign={"left"} mt={3} fontWeight={"bold"} style={{ fontFamily: 'Ubuntu' }}>Elden Ring</Typography>
                            <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px", background: "gray" }}> </Divider>
                            <Typography mb={2} variant="h6" component={"h1"} >FromSoftware | 25/02/2022</Typography>
                            <StyledStack sx={{ overflow: "auto", paddingBottom: 2 }} direction={"row"} spacing={.5}>
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Fantasía Oscura" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Rol" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Difícil" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Mundo abierto" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Fantasía Oscura" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Rol" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Difícil" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Mundo abierto" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Fantasía Oscura" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Rol" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Difícil" />
                                <Chip color="info" onClick={navigateFunction("/browse?v=" + "algo")} label="Mundo abierto" />
                            </StyledStack>

                            <Typography variant="h6" textAlign={"left"} my={3}>Elden Ring es un videojuego de rol de acción desarrollado por FromSoftware y publicado por Bandai Namco Entertainment. El videojuego surge de una colaboración entre el director y diseñador Hidetaka Miyazaki y el novelista de fantasía George R. R. Martin. Fue lanzado a nivel mundial el 25 de febrero de 2022, fecha revelada durante el evento Summer Game Fest, para las plataformas Xbox One, Xbox Series X/S, Microsoft Windows, PlayStation 4 y PlayStation 5.</Typography>
                        </Grid>
                        <Grid item container xs={12} justifyContent="flex-end" alignItems="flex-end">
                            <Button onClick={handleOpen2} sx={{ marginRight: "30px", marginY: 1 }} variant="contained" color="warning" endIcon={<AddCircleIcon />}>Crear Reseña</Button>
                            <Button onClick={handleOpen3} sx={{ marginRight: "30px", marginY: 1 }} variant="contained" color="warning" endIcon={<AddCircleIcon />}>Modificar Reseña</Button>

                            <Modal
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="title-review">
                                <Box sx={style}>
                                    <Typography my={2.5} id="title-review" variant="h5" component="h2">
                                        Reseña y puntúa el juego
                                    </Typography>
                                    <Grid container alignItems="center" justifyContent="center">
                                        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 200, overflow: "auto", overflowX: "hidden" }}>
                                            {[0, 1, 2, 3, 4, 5].map((value) => {
                                                const labelId = `checkbox-list-secondary-label-${value}`;
                                                return (
                                                    <ListItem
                                                        key={value}
                                                        secondaryAction={
                                                            <Checkbox
                                                                edge="end"
                                                                onChange={handleToggle(value)}
                                                                checked={checked.indexOf(value) !== -1}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        }
                                                        disablePadding
                                                    >
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    alt={`Avatar n°${value + 1}`}
                                                                    src={`/static/images/avatar/${value + 1}.jpg`}
                                                                />
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>

                                    </Grid>
                                    <TextField fullWidth id="outlined-basic" multiline rows={4} maxRows={8} autoComplete='none' variant="outlined" sx={{ mt: 1.5, mb: 2 }} />
                                    <TextField
                                        id="date"
                                        label="¿Cuándo terminaste el juego? (opcional)"
                                        type="date"
                                        color={"info"}
                                        defaultValue="2017-05-24"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Grid container justifyContent="-moz-initial" mt={2}>
                                        <Grid xs={10}>
                                            <Rating precision={0.5} name="no-value" defaultValue={1} size="large" />
                                        </Grid>
                                        <Grid xs={2} sx={{
                                            display: "flex",
                                            flexDirection: 'row-reverse'
                                        }}>
                                            <Button color="buttonPrimary" sx={{ color: "#FFF2EF" }} variant="contained">Publicar</Button>
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
                                            {[0, 1, 2, 3, 4, 5].map((value) => {
                                                const labelId = `checkbox-list-secondary-label-${value}`;
                                                return (
                                                    <ListItem
                                                        key={value}
                                                        secondaryAction={
                                                            <Checkbox
                                                                edge="end"
                                                                onChange={handleToggle(value)}
                                                                checked={checked.indexOf(value) !== -1}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        }
                                                        disablePadding
                                                    >
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    alt={`Avatar n°${value + 1}`}
                                                                    src={`/static/images/avatar/${value + 1}.jpg`}
                                                                />
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </Grid>
                                    <TextField fullWidth id="outlined-basic" multiline rows={4} maxRows={8} autoComplete='none' variant="outlined" sx={{ mt: 1.5, mb: 2 }} />
                                    <TextField
                                        id="date"
                                        label="¿Cuándo terminaste el juego? (opcional)"
                                        type="date"
                                        color={"info"}
                                        defaultValue="2017-05-24"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Grid container justifyContent="-moz-initial" mt={2}>
                                        <Grid xs={6}>

                                            <Rating precision={0.5} name="no-value" defaultValue={1} size="large" />
                                        </Grid>
                                        <Grid xs={6} sx={{
                                            display: "flex",
                                            flexDirection: 'row-reverse'
                                        }}>
                                            <Button variant="contained" color="error" sx={{ color: "#FFF2EF" }}>Eliminar</Button>
                                            <Button variant="contained" color="buttonPrimary" sx={{ color: "#FFF2EF", marginRight: 5 }}>Actualizar</Button>

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
                                                <FormControlLabel control={<Switch color={"buttonPrimary"} />} label={<span style={{ color: '#FFF2EF' }}>Quiero buscar jugadores</span>} />
                                            </FormGroup>
                                            <Typography color={"#FFF2EF"} width={"80%"} sx={{ my: 10 }}>
                                                Estos son los usuarios que buscan tener una partida en Elden Ring, comunícate con ellos por sus redes sociales o enviándoles un mensaje
                                            </Typography>

                                        </Grid>

                                        <Grid item container xs={12} md={12} lg={8} justifyContent="center" alignItems={"center"} sx={{ maxHeight: "470px", overflow: "auto" }}>
                                            <ActiveUsers></ActiveUsers>
                                            <ActiveUsers></ActiveUsers>
                                            <ActiveUsers></ActiveUsers>
                                            <ActiveUsers></ActiveUsers>
                                            <ActiveUsers></ActiveUsers>
                                            <ActiveUsers></ActiveUsers>
                                            <ActiveUsers></ActiveUsers>
                                            <ActiveUsers></ActiveUsers>
                                            <ActiveUsers></ActiveUsers>
                                        </Grid>
                                    </Grid>
                                </BoxModalActiveGames>
                            </Modal>
                        </Grid>




                    </Grid>

                </Grid>


                <Grid container item xs={12} justifyContent={"center"} alignItems={"center"}>

                    <Review></Review>

                    <Review></Review>
                </Grid>

            </Grid>
        </ThemeProvider>
    )
}
