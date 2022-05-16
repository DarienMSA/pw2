import { alpha, Avatar, Button, Grid, Link, Paper, Popover, styled, TextField, ThemeProvider, Typography } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/system";
import btheme from "../Components/GameView-Theme";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../Services/UserServices";
import LoggedBar from "../Components/loggedBar";
import UnloggedBar from "../Components/unloggedBar";


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
    const session = localStorage.getItem("UserSession");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const onRegister = () => {
        let pass2 = document.getElementById("pass2").value;
        let infoName = document.getElementById("info-name");
        let infoEmail = document.getElementById("info-email");
        let infoPassword = document.getElementById("info-password");
        let infoPass2 = document.getElementById("info-pass2");
        document.getElementById("info-email").style.display = "none";


        if ((user.name.length <= 3 || user.name.length >= 31)) {
            infoName.style.color = "#F55353";

        }
        else {
            infoName.style.color = "white";
            if ((!validateEmail(user.email))) {

                infoEmail.style.display = "block";

            } else {
                infoEmail.style.display = "none";
                if ((!validatePassword(user.password))) {
                    infoPassword.style.color = "#F55353";

                } else {
                    infoPassword.style.color = "white";
                    if (user.password !== pass2) {

                        infoPass2.style.display = "block";

                    } else {
                        infoPass2.style.display = "none";
                        user.desc = "";
                        user.profilePic = "";
                        user.birthday = "";
                        user.social =
                        {
                            twitter: "",
                            facebook: "",
                            instagram: "",
                            discord: ""
                        }
                        async function UserPost(userData) {
                            const data = await CreateUser(userData);
                            if (data.code === undefined) {
                                localStorage.setItem("UserSession", data._id)
                                navigate("/");
                            } else {
                                document.getElementById("info-email").style.display = "block";
                            }
                        }
                        UserPost(user)
                    }
                }
            }
        }

    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (pass) => {
        return String(pass)
            .match(
                /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].*)(?=.*[@#$%^&+*!=]).*$/
            );
    };

    return (
        <ThemeProvider theme={btheme}>
            {session !== null ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
            <Grid container alignItems="center" justifyContent="center" height="90vh">
                <Grid sx={{ mt: 5 }} container align="center" justifyContent="center">
                    <img width={200} src="https://cdn.discordapp.com/attachments/928138608894967828/958891765342044160/Logo_nav_noBG__blue.png"></img>
                </Grid>
                < Paper elevation={8} style={paperStyle} sx={{ background: "#406882" }}>
                    <Grid sx={{ mt: 2, mb: 3 }} align='center'>
                        <Typography variant="h4" fontWeight={"bold"} color={"#FFF2EF"}>Registrate</Typography>
                    </Grid>
                    <SignInInput fullWidth required variant="outlined" margin="dense" name="name" onChange={handleOnChange} placeholder='Ingrese Usuario' label='Usuario' /><br />
                    <Typography variant="caption" color={"white"} fontWeight="bold" id="info-name">*El nombre debe ser entre 4 y 30 caracteres.</Typography>
                    <SignInInput fullWidth required variant="outlined" margin="dense" name="email" onChange={handleOnChange} type='email' placeholder='Ingrese Correo' label='Correo' /><br />
                    <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-email" sx={{ display: 'none' }}>Introduce un correo válido.</Typography>
                    <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-email2" sx={{ display: 'none' }}>Ya existe un usuario con ese correo.</Typography>

                    <SignInInput fullWidth required variant="outlined" name="password" margin="dense" onChange={handleOnChange} type='password' placeholder='Ingrese Contraseña' label='Contraseña' /><br />
                    <Typography variant="caption" color={"white"} fontWeight="bold" id="info-password"
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}>*requisitos</Typography>
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
                    <SignInInput fullWidth required variant="outlined" sx={{ mb: 2 }} margin="dense" type='password' id="pass2" placeholder='Confirme Contraseña' label='Confirme Contraseña' /><br />
                    <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-pass2" sx={{ display: 'none' }}>Las contraseñas nos coinciden.</Typography>

                    <WhiteButton type="submit" onClick={onRegister} style={btnStyle} size='large' fullWidth variant='contained'>Registrar</WhiteButton>
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