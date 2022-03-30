import { Avatar, Grid, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import React from 'react'

export default function NotifItem() {
  return (
    <Grid container maxWidth={400} direction="row"
    >

      <Grid item container xs={2} textAlign="center"
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Avatar alt="Remy Sharp" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
      </Grid>

      <Grid item container xs={10}
        direction="row"
        justifyContent="center"
        alignItems="center">

        <Typography fontWeight={"bold"} gutterBottom noWrap> ¡Bienvenido a GameView! </Typography>
        <Typography variant="caption" noWrap> <ChatIcon sx={{ width: "15px", height: "15px" }} />  24/03/2022 </Typography>
      </Grid>

    </Grid>
  )
}

