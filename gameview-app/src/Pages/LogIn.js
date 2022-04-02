import { alpha, styled, Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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

function LogInScreen() {

    const paperStyle = { padding: 20, height: 420, width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = { margin: '16px 0' }

    return (
        <Grid container alignItems="center" justifyContent="center" height="80vh">
            <Grid sx={{ mt: 5 }} container align="center" justifyContent="center">
                <img width={200} src="https://cdn.discordapp.com/attachments/928138608894967828/958891765342044160/Logo_nav_noBG__blue.png"></img>
            </Grid>
            <Paper elevation={8} style={paperStyle} sx={{ background: "#406882" }}>
                <Grid sx={{ mt: 2, mb: 4 }} align='center'>
                    <Typography variant="h4" fontWeight={"bold"} color={"#FFF2EF"}>Registrate</Typography>
                </Grid>
                <SignInInput fullWidth required color='info' margin='dense' variant="outlined" placeholder='Ingrese Usuario' label='Usuario' /><br />
                <SignInInput fullWidth required color='info' margin='dense' variant="outlined" placeholder='Ingrese Contraseña' label='Contraseña' /><br />

                <WhiteButton href="/login" style={btnStyle} size='large' fullWidth variant='outlined' color='success'>Ingresar</WhiteButton>
                <Typography color={"#FFF2EF"} >¿Ya tienes una cuenta?&nbsp;
                    <Link color="inherit" href="#">
                        Ingresa
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default LogInScreen;