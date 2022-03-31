import { alpha, Avatar, Button, Grid, Link, Paper, styled, TextField, Typography } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Fragment, useState } from "react";

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

    const paperStyle = { padding: 20, height: 600, width: 320, margin: "20px auto" }
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
        <Fragment>
            <Grid container alignItems="center" justifyContent="center" height="92vh" bgcolor={"#E3EAEE"}>
                < Paper elevation={8} style={paperStyle} sx={{ background: "#406882" }}>
                    <Grid align='center'>
                        <Grid my={3} item sx={12} container justifyContent={"center"} alignItems={"center"}>

                            <img width={150} src="https://media.discordapp.net/attachments/928138608894967828/958875633096753152/Logo_noBG_2.png"></img>

                        </Grid>
                        <Typography variant="h4" fontWeight={"bold"} color={"#FFF2EF"}>Registrate</Typography>
                    </Grid>
                    <SignInInput fullWidth required variant="outlined" margin="dense" onChange={onNombreFChange} placeholder='Ingrese Usuario' label='Usuario' /><br />
                    <SignInInput fullWidth required variant="outlined" margin="dense" onChange={onCorreoFChange} type='email' placeholder='Ingrese Correo' label='Correo' /><br />
                    <SignInInput fullWidth required variant="outlined" margin="dense" onChange={onContraseñaFChange} type='password' placeholder='Ingrese Contraseña' label='Contraseña' /><br />
                    <SignInInput fullWidth required variant="outlined" margin="dense" onChange={onRContraseñaFChange} type='password' placeholder='Confirme Contraseña' label='Confirme Contraseña' /><br />
                    <WhiteButton onClick={onRegister} style={btnStyle} size='large' fullWidth variant='contained'>Registrar</WhiteButton>
                    <Typography color={"#FFF2EF"}>Ya tienes una cuenta?&nbsp;
                        <Link color="inherit" href="/memes">
                            Ingresa
                        </Link>
                    </Typography>




                </Paper>
            </Grid>
        </Fragment >

    )
}
export default SignInScreen;