import { Avatar, AvatarGroup, Box, Button, Divider, Grid, IconButton, Modal, Rating, styled, TextField, Typography } from '@mui/material'
import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Comment from './Review/Comment';
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

const ReviewGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        width: "80%"
    },
    [theme.breakpoints.up('md')]: {
        width: "70%"
    },
    [theme.breakpoints.up('lg')]: {
        width: "60%",
        marginRight: 230
    },

}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down('md')]: {
        width: 150, height: 150
    },
    [theme.breakpoints.up('md')]: {
        width: 150, height: 150,
        marginRight: 100
    },
    [theme.breakpoints.up('lg')]: {
        width: 150, height: 150
    },

}));

const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
    },
    [theme.breakpoints.up('md')]: {

        marginRight: 100
    },
    [theme.breakpoints.up('lg')]: {

    },

}));

export default function Review() {
    const navigate = useNavigate();

    const navigateFunction = url => () => {
        navigate(url);

    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    return (
        <ReviewGrid container sx={{ borderRadius: 16 }} my={2} alignItems={"center"} justifyContent={"center"}>
            <Grid container item xs={12} md={2} alignItems={"center"} justifyContent={"center"}>
                <Box item>
                    <StyledAvatar onClick={navigateFunction("/account?u=" + "nombreUsu")} src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg"></StyledAvatar>
                </Box>
                <StyledBox item width={"100%"} textAlign={"center"}>
                    <Typography variant={"caption"} component="legend" fontWeight={"bold"}>3.5</Typography>
                    <Rating precision={0.5} name="read-only" value={3.5} readOnly
                        emptyIcon={
                            <StarBorderIcon fontSize="inherit" />
                        } />
                </StyledBox>



            </Grid>
            <Grid item xs={12} md={8}>
                <Typography variant='h5' textAlign={"left"} mt={3} fontWeight={"bold"} style={{ fontFamily: 'Ubuntu' }}>Darien Miguel Sánchez Arévalo</Typography>
                <Typography mb={2} variant="caption" component={"h1"} >25/02/2022</Typography>
                <Divider sx={{ marginTop: "15px", marginBottom: "15px", background: "gray" }}> </Divider>
                <Typography variant="p" textAlign={"left"} mt={3}>Elden Ring es un videojuego de rol de acción desarrollado por FromSoftware y publicado por Bandai Namco Entertainment. El videojuego surge de una colaboración entre el director y diseñador Hidetaka Miyazaki y el novelista de fantasía George R. R. Martin. Fue lanzado a nivel mundial el 25 de febrero de 2022, fecha revelada durante el evento Summer Game Fest, para las plataformas Xbox One, Xbox Series X/S, Microsoft Windows, PlayStation 4 y PlayStation 5.</Typography>

                <Grid item xs={12} container alignItems={"center"} justifyContent={"space-between"} mt={3}>
                    <AvatarGroup total={24}>
                        <Avatar alt="Remy Sharp" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
                        <Avatar alt="Travis Howard" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
                        <Avatar alt="Agnes Walker" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
                        <Avatar alt="Trevor Henderson" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
                    </AvatarGroup>
                    <Button onClick={handleOpen} sx={{ marginRight: 5, color: "#FFF2EF" }} color={"buttonPrimary"} variant="contained">Comentarios</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h4" component="h4">
                                Comentarios de la reseña
                            </Typography>
                            <Box
                                sx={{
                                    maxHeight: "720px",
                                    overflow: "auto",
                                    overflowX: "hidden",
                                    p: 1,
                                    mt: 2
                                }}>
                                <Comment />
                            </Box>
                            <Button onClick={handleOpen2} sx={{ marginRight: 5, color: "#FFF2EF" }} color="buttonPrimary" variant="contained">Comentar</Button>
                            <Modal
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h5" component="h2">
                                        Comentar reseña del juego
                                    </Typography>
                                    <TextField fullWidth id="outlined-basic" multiline rows={2} maxRows={4} autoComplete='none' variant="outlined" sx={{ mt: 1.5, mb: 2 }} />
                                    <Grid container justifyContent="-moz-initial">
                                        <Grid sx={{
                                            display: "flex",
                                            flexDirection: 'row-reverse'
                                        }}>
                                            <Button color="buttonPrimary" sx={{ color: "#FFF2EF" }} variant="contained">Publicar</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>
                        </Box>
                    </Modal>
                </Grid>
                <Grid item xs={12} container alignItems={"start"} justifyContent={"start"} mt={1}>
                    <IconButton variant="p" textAlign={"left"} color="buttonPrimary"><ThumbUpIcon /></IconButton>
                    <IconButton sx={{ mr: 5 }} variant="p" textAlign={"left"} color="warning"><ThumbDownIcon /></IconButton>
                </Grid>

            </Grid>
        </ReviewGrid>
    )
}
