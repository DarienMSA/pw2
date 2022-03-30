import { Avatar, AvatarGroup, Box, Button, Divider, Grid, Rating, styled, Typography } from '@mui/material'
import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ReviewGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        width: "80%"
    },
    [theme.breakpoints.up('md')]: {
        width: "70%"
    },
    [theme.breakpoints.up('lg')]: {
        width: "60%"
    },

}));

export default function Review() {
    return (
        <ReviewGrid container sx={{ borderStyle: "solid", borderWidth: "5px", backgroundColor: "black", borderRadius: 16 }} my={10}>
            <Grid container item xs={12} md={4} alignItems={"center"} justifyContent={"center"}>
                <Box item>
                    <Avatar sx={{ width: 150, height: 150 }} src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg"></Avatar>
                </Box>
                <Box item width={"100%"} textAlign={"center"}>
                    <Typography sx={{ color: "white" }} variant={"caption"} component="legend" fontWeight={"bold"}>3.5</Typography>
                    <Rating precision={0.5} sx={{ borderColor: "white" }} name="read-only" value={3.5} readOnly
                        emptyIcon={
                            <StarBorderIcon fontSize="inherit" sx={{ color: "white" }} />
                        } />
                </Box>



            </Grid>
            <Grid item xs={12} md={8}>
                <Typography color="white" variant='h5' textAlign={"left"} mt={3} fontWeight={"bold"} style={{ fontFamily: 'Ubuntu' }}>Darien Miguel Sánchez Arévalo</Typography>
                <Typography mb={2} variant="caption" component={"h1"} color={"white"}>25/02/2022</Typography>
                <Divider sx={{ marginTop: "15px", marginBottom: "15px", background: "gray" }}> </Divider>
                <Typography color="white" variant="p" textAlign={"left"} mt={3}>Elden Ring es un videojuego de rol de acción desarrollado por FromSoftware y publicado por Bandai Namco Entertainment. El videojuego surge de una colaboración entre el director y diseñador Hidetaka Miyazaki y el novelista de fantasía George R. R. Martin. Fue lanzado a nivel mundial el 25 de febrero de 2022, fecha revelada durante el evento Summer Game Fest, para las plataformas Xbox One, Xbox Series X/S, Microsoft Windows, PlayStation 4 y PlayStation 5.</Typography>
                <Grid item xs={12} container alignItems={"center"} justifyContent={"space-between"} my={5}>
                    <AvatarGroup total={24}>
                        <Avatar alt="Remy Sharp" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
                        <Avatar alt="Travis Howard" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
                        <Avatar alt="Agnes Walker" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
                        <Avatar alt="Trevor Henderson" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
                    </AvatarGroup>
                    <Button sx={{ marginRight: 5 }} variant="contained">Comentarios</Button>
                </Grid>


            </Grid>
        </ReviewGrid>
    )
}
