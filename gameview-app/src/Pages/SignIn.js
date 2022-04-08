import { alpha, Avatar, Button, Grid, Link, Paper, Popover, styled, TextField, ThemeProvider, Typography } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Fragment, useState } from "react";
import { Box } from "@mui/system";
import btheme from "../Components/GameView-Theme";
import { useNavigate } from "react-router-dom";

const SignInInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputLabel-root": {
        color: "#FFF2EF" //white_gv
    },
    '& label.Mui-focused': {
        color: "#FFF2EF"
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#FFF2EF',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#FFF2EF',
        },
        '&:hover fieldset': {
            borderColor: '#B1D0E0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFF2EF',
        },
    },
    "& .MuiOutlinedInput-input": {
        color: "#FFF2EF"
    }

}));

const WhiteButton = styled(Button)(({ theme }) => ({
    background: "#FFF2EF", color: "black", borderColor: "#FFF2EF",
    '&:hover': {
        backgroundColor: alpha("#FFF2EF", 0.75), //white_gv
    },

}));

function SignInScreen() {
    const navigate = useNavigate();

    const navigateFunction = url => () => {

        navigate(url);

    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const paperStyle = { padding: 20, height: 600, width: 320 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = { margin: '16px 0' }

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [Rcontraseña, setRcontraseña] = useState('');

    const onNombreFChange = (value) => {
        setNombre(value.target.value);
    }
    const onCorreoFChange = (value) => {
        setCorreo(value.target.value);
    }
    const onContraseñaFChange = (value) => {
        setContraseña(value.target.value);
    }
    const onRContraseñaFChange = (value) => {
        setRcontraseña(value.target.value);
    }

    const onRegister = () => {
        if (nombre === "") {
            alert("Falta el nombre");
        }
        else if ((correo === "")) {
            alert("Falta el correo");
        }
        else if ((contraseña === "")) {
            alert("Falta la contraseña");
        }
        else if ((Rcontraseña === "")) {
            alert("Falta la confirmacion de contraseña");
        }
        else if ((contraseña !== Rcontraseña)) {
            alert("Las contraseñas nos coinciden");
        }
        else {
            let D = "Usuario: " + nombre + " registrado"
            alert(D);
        }
    }

    return (
        <ThemeProvider theme={btheme}>
            <Grid container alignItems="center" justifyContent="center" height="90vh">
                <Grid sx={{ mt: 5 }} container align="center" justifyContent="center">
                    <img width={200} src="https://cdn.discordapp.com/attachments/928138608894967828/958891765342044160/Logo_nav_noBG__blue.png"></img>
                </Grid>
                < Paper elevation={8} style={paperStyle} sx={{ background: "#406882" }}>
                    <Grid sx={{ mt: 2, mb: 3 }} align='center'>
                        <Typography variant="h4" fontWeight={"bold"} color={"#FFF2EF"}>Registrate</Typography>
                    </Grid>
                    <SignInInput fullWidth required variant="outlined" margin="dense" onChange={onNombreFChange} placeholder='Ingrese Usuario' label='Usuario' /><br />
                    <SignInInput fullWidth required variant="outlined" margin="dense" onChange={onCorreoFChange} type='email' placeholder='Ingrese Correo' label='Correo' /><br />
                    <SignInInput aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose} fullWidth required variant="outlined" margin="dense" onChange={onContraseñaFChange} type='password' placeholder='Ingrese Contraseña' label='Contraseña' /><br />
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                            pointerEvents: 'none',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography sx={{ p: 1 }}>La contraseña debe contener:</Typography>
                        <Typography sx={{ p: 1 }}>mínimo 8 caracteres</Typography>
                        <Typography sx={{ p: 1 }}>una mayúscula</Typography>
                        <Typography sx={{ p: 1 }}>una minúscula</Typography>
                        <Typography sx={{ p: 1 }}>un número </Typography>
                        <Typography sx={{ p: 1 }}>un carácter especial: @#$%^+*!=</Typography>
                    </Popover>
                    <SignInInput fullWidth required variant="outlined" sx={{ mb: 2 }} margin="dense" onChange={onRContraseñaFChange} type='password' placeholder='Confirme Contraseña' label='Confirme Contraseña' /><br />
                    <WhiteButton onClick={onRegister} style={btnStyle} size='large' fullWidth variant='contained'>Registrar</WhiteButton>
                    <Typography color={"#FFF2EF"}>¿Ya tienes una cuenta?&nbsp;
                        <Link onClick={navigateFunction("/login")} color="inherit" sx={{ cursor: "pointer" }}>
                            Ingresa
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </ThemeProvider>
    )
}
export default SignInScreen;