import { Avatar, Button, Divider, Grid, Modal, Paper, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom'

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

export default function Comment() {
    const navigate = useNavigate();
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const navigateFunction = url => () => {
        navigate(url)
    };

    return (
        <Paper elevation={5} sx={{ padding: 1, margin: 1 }}>
            <Grid container justifyContent="-moz-initial">
                <Grid sx={{ m: 1 }}>
                    <Avatar onClick={navigateFunction("/account?u=" + "hola")} sx={{ cursor: "pointer", bgcolor: blue[500] }}>N</Avatar>
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
                    <Button onClick={handleOpen2} size="small" color="warning" variant="contained">Modificar</Button>
                </Grid >
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
                                <Button color="error" sx={{ color: "#FFF2EF", marginLeft: 10 }} variant="contained">Eliminar</Button>
                                <Button color="buttonPrimary" sx={{ color: "#FFF2EF" }} variant="contained">Actualizar</Button>

                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </Grid>
        </Paper>
    )
}
