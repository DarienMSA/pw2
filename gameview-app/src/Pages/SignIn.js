import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useState } from "react";

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
        <Grid container alignItems="center" justifyContent="center" height="92vh">
            <Paper elevation={8} style={paperStyle} sx={{ background: "secondary" }}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><CreateOutlinedIcon /></Avatar>
                    <h2>Registrate</h2>
                </Grid>
                <TextField fullWidth required variant="standard" color="info" margin="dense" onChange={onNombreFChange} placeholder='Ingrese Usuario' label='Usuario' /><br />
                <TextField fullWidth required variant="standard" color="info" margin="dense" onChange={onCorreoFChange} type='email' placeholder='Ingrese Correo' label='Correo' /><br />
                <TextField fullWidth required variant="standard" color="info" margin="dense" onChange={onContraseñaFChange} type='password' placeholder='Ingrese Contraseña' label='Contraseña' /><br />
                <TextField fullWidth required variant="standard" color="info" margin="dense" onChange={onRContraseñaFChange} type='password' placeholder='Confirme Contraseña' label='Confirme Contraseña' /><br />
                <Button onClick={onRegister} style={btnStyle} size='large' fullWidth variant='outlined' color='success'>Registrar</Button>
                <Typography>Ya tienes una cuenta ?
                    <Link href="/memes">
                        Ingresa
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
export default SignInScreen;