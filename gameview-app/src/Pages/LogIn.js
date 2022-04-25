import { alpha, styled, Avatar, Button, Grid, Link, Paper, TextField, Typography, ThemeProvider } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import btheme from "../Components/GameView-Theme";
import { useNavigate } from "react-router-dom";
import LoggedBar from "../Components/loggedBar";
import UnloggedBar from "../Components/unloggedBar";
import { LogIn } from "../Services/UserServices";

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
    const navigate = useNavigate();
    const session = localStorage.getItem("UserSession");

    const navigateFunction = url => () => {
        navigate(url);

    };

    const logInProcess = () => {
        let email = document.getElementById("email").value;
        let pass = document.getElementById("pass").value;
        let info_email = document.getElementById("info-email");
        let info_pass = document.getElementById("info-pass");
        let info_login = document.getElementById("info-login");

        info_email.style.display = "none";
        info_pass.style.display = "none";
        info_login.style.display = "none";
        if (email === "") {
            info_email.style.display = "block";
        }
        if (pass === "") {
            info_pass.style.display = "block";
        }

        if (pass !== "" && email !== "") {
            async function LogInFunction(e, p) {
                const res = await LogIn(e, p);
                console.log(res);
                if (res.code === undefined) {
                    localStorage.setItem("UserSession", res.data._id)
                    navigate("/");
                } else {
                    info_login.style.display = "block";
                }
            }
            LogInFunction(email, pass);
        }
    }

    const paperStyle = { padding: 20, height: 420, width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = { margin: '16px 0' }

    return (
        <ThemeProvider theme={btheme}>
            {session !== null ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
            <Grid container alignItems="center" justifyContent="center" height="80vh">
                <Grid sx={{ mt: 5 }} container align="center" justifyContent="center">
                    <img width={200} src="https://cdn.discordapp.com/attachments/928138608894967828/958891765342044160/Logo_nav_noBG__blue.png"></img>
                </Grid>
                <Paper elevation={8} style={paperStyle} sx={{ background: "#406882" }}>
                    <Grid sx={{ mt: 2, mb: 4 }} align='center'>
                        <Typography variant="h4" fontWeight={"bold"} color={"#FFF2EF"}>Inicia sesión</Typography>
                    </Grid>
                    <SignInInput fullWidth required color='info' id="email" margin='dense' variant="outlined" placeholder='Ingrese Correo' label='Correo' type='email' /><br />
                    <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-email" sx={{ display: 'none' }}>Introduce un correo.</Typography>
                    <SignInInput fullWidth required color='info' id="pass" margin='dense' variant="outlined" placeholder='Ingrese Contraseña' label='Contraseña' type='password' /><br />
                    <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-pass" sx={{ display: 'none' }}>Introduce una contraseña.</Typography>

                    <WhiteButton style={btnStyle} size='large' fullWidth variant='outlined' color='success' onClick={logInProcess}>Ingresar</WhiteButton>
                    <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-login" sx={{ display: 'none' }}>No se ha encontrado el usuario.</Typography>
                    <Typography color={"#FFF2EF"} >¿Aún no tienes una cuenta?&nbsp;
                        <Link onClick={navigateFunction("/signin")} color="inherit" href="#">
                            Regístrate
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </ThemeProvider>
    )
}

export default LogInScreen;