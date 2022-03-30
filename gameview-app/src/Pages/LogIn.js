import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function LogInScreen() {

    const paperStyle = { padding: 20, height: 500, width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = { margin: '16px 0' }

    return (
        <Grid container alignItems="center" justifyContent="center" height="92vh">
            <Paper elevation={3} style={paperStyle}>
                <Grid className='center' align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Iniciar Sesion</h2>
                </Grid>
                <TextField fullWidth required color='info' margin='dense' variant="standard" placeholder='Ingrese Usuario' label='Usuario' /><br />
                <TextField fullWidth required color='info' margin='dense' variant="standard" placeholder='Ingrese Contraseña' label='Contraseña' /><br />

                <Button href="/login" style={btnStyle} size='large' fullWidth variant='outlined' color='success'>Ingresar</Button>
                <Typography>Ya tienes una cuenta ?
                    <Link href="#">
                        Ingresa
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default LogInScreen;