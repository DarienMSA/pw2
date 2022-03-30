import { Box, Button, CardMedia, Chip, Divider, FormControlLabel, FormGroup, Grid, Modal, Rating, styled, Switch, Typography } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState } from 'react'
import ActiveUsers from '../Components/ShowGame/ActiveUsers';
import Review from '../Components/ShowGame/Review';


const GameImage = styled(CardMedia)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        height: "400px",
        width: "400px"
    },
    [theme.breakpoints.up('md')]: {
        height: "250px",
        width: "250px"

    },
    [theme.breakpoints.up('lg')]: {
        height: "400px",
        width: "400px"
    },

}));

const BoxModalActiveGames = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
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


export default function ShowGame() {
    const [value, setValue] = useState(4);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //
    return (
        <Grid container>
            <Grid container item xs={12} m={5} sx={{ borderStyle: "solid", borderWidth: "5px", borderRadius: 16, backgroundColor: "black" }}>
                <Grid item container xs={12} md={5} justifyContent={"center"} alignItems={"center"} my={5}>
                    <Box item>
                        <GameImage sx={{ borderRadius: 16, borderColor: "white", borderStyle: "solid", borderTopWidth: "15px", borderBottomWidth: "15px" }}
                            component="img"


                            image="https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png"
                            alt="green iguana"

                        />
                    </Box>
                    <Box mt={5} width={"100%"} textAlign="center">
                        <Typography sx={{ color: "white" }} component="legend" fontWeight={"bold"}>Puntuación</Typography>
                        <Rating precision={0.5} sx={{ borderColor: "white" }} name="read-only" value={value} readOnly
                            emptyIcon={
                                <StarBorderIcon fontSize="inherit" sx={{ color: "white" }} />
                            } />
                    </Box>


                </Grid>
                <Grid item container xs={12} md={7} my={5} direction="row">
                    <Grid item xs={12}>
                        <Typography color="white" variant='h2' textAlign={"left"} mt={3} fontWeight={"bold"} style={{ fontFamily: 'Ubuntu' }}>Elden Ring</Typography>
                        <Divider variant="middle" sx={{ marginTop: "15px", marginBottom: "15px", background: "gray" }}> </Divider>
                        <Typography mb={2} variant="caption" component={"h1"} color={"white"}>FromSoftware | 25/02/2022</Typography>
                        <Chip color="secondary" label="Fantasía Oscura" />
                        <Chip color="secondary" label="Rol" />
                        <Chip color="secondary" label="Difícil" />
                        <Chip color="secondary" label="Mundo abierto" />
                        <Typography color="white" variant="h6" textAlign={"left"} mt={3}>Elden Ring es un videojuego de rol de acción desarrollado por FromSoftware y publicado por Bandai Namco Entertainment. El videojuego surge de una colaboración entre el director y diseñador Hidetaka Miyazaki y el novelista de fantasía George R. R. Martin. Fue lanzado a nivel mundial el 25 de febrero de 2022, fecha revelada durante el evento Summer Game Fest, para las plataformas Xbox One, Xbox Series X/S, Microsoft Windows, PlayStation 4 y PlayStation 5.</Typography>
                    </Grid>

                    <Grid item container xs={12} justifyContent="flex-end" alignItems="flex-end">
                        <Button sx={{ marginRight: "30px" }} variant="contained" color="warning" endIcon={<AddCircleIcon />}>Crear Reseña</Button>
                        <Button sx={{ marginRight: "30px" }} onClick={handleOpen} variant="contained" endIcon={<SearchIcon />}>Buscar jugadores</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <BoxModalActiveGames>
                                <Typography textAlign={"center"} id="modal-modal-title" variant="h6" component="h2">
                                    Buscando jugadores para Elden Ring
                                </Typography>
                                <Divider sx={{ marginY: "15px" }} variant="middle"></Divider>
                                <Grid container id="modal-modal-description" sx={{ my: 2 }}>
                                    <Grid item container xs={4} justifyContent="center" alignItems={"center"}>
                                        <FormGroup>
                                            <FormControlLabel control={<Switch />} label="Quiero buscar jugadores" />
                                        </FormGroup>
                                        <Typography width={"80%"} sx={{ my: 10 }}>
                                            Estos son los usuarios que buscan tener una partida en Elden Ring, comunícate con ellos por sus redes sociales o enviándoles un mensaje
                                        </Typography>
                                        <Divider orientation="vertical" flexItem />
                                    </Grid>

                                    <Grid item container xs={8} justifyContent="center" alignItems={"center"} sx={{ maxHeight: "470px", overflow: "auto" }}>
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
                <Grid container item xs={12} justifyContent={"center"} alignItems={"center"}>
                    <Typography variant={"h3"} component={"h3"}>Tu reseña</Typography>
                </Grid>

                <Review></Review>
                <Divider></Divider>
                <Review></Review>
            </Grid>

        </Grid>
    )
}
