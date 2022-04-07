import { Avatar, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'

export default function Comment() {
    return (
        <Paper sx={{ padding: 1, margin: 1 }}>
            <Grid container justifyContent="-moz-initial">
                <Grid sx={{ m: 1 }}>
                    <Avatar sx={{ bgcolor: blue[500] }}>N</Avatar>
                </Grid>
                <Grid xs={10}>
                    <Typography sx={{ ml: 1 }} id="modal-modal-title" variant="h6" component="h6" style={{ fontFamily: 'Ubuntu' }}>
                        Nora
                    </Typography>
                    <Typography sx={{ ml: 1.5 }} id="modal-modal-title" variant="caption" component="div">
                        29/03/22
                    </Typography>
                    <Divider variant="fullWidth" sx={{ mb: 1 }} />
                    <Typography sx={{ ml: 2, mb: 1.5 }} id="modal-modal-title" variant="body2" component="h6">
                        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.
                    </Typography>

                </Grid>
                <Grid container sx={{ display: "flex", flexDirection: 'row-reverse' }}>
                    <Button size="small" color="warning" variant="contained">Modificar</Button>
                </Grid >
            </Grid>
        </Paper>
    )
}
