import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Avatar, Button, Divider, Grid, IconButton, Stack, TextField, styled, Modal, Fade, Backdrop, InputAdornment, TextareaAutosize, InputLabel, ThemeProvider, Alert, Collapse } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PanoramaIcon from '@mui/icons-material/Panorama';
import DescriptionIcon from '@mui/icons-material/Description';
import btheme from '../Components/GameView-Theme';
import LoggedBar from '../Components/loggedBar';
import UnloggedBar from '../Components/unloggedBar';
import { GetUser, GetUserEmail, UpdateUser } from '../Services/UserServices';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../fb';
import { useAuth0 } from '@auth0/auth0-react';
import { optionsChangePassword, requestChangePassword } from '../Services/AuthServices';
import facebookImage from '../Assets/facebook.png';
import instagramImage from '../Assets/instagram.png';
import twitterImage from '../Assets/twitter.png';
import discordImage from '../Assets/discord.png';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: "#FFF2EF"
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#FFF2EF',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black',
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

const StyledBox = styled(Box)(({ theme }) => ({

    [theme.breakpoints.down('md')]: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0
    },
    [theme.breakpoints.up('md')]: {
        marginTop: 40,
        marginBottom: 40,
        marginLeft: 100,
        marginRight: 100
    },
    [theme.breakpoints.up('lg')]: {
        marginTop: 40,
        marginBottom: 40,
        marginLeft: 100,
        marginRight: 100
    },
}));

const StyledInput = styled('input')({
    display: 'none',
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <StyledBox sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </StyledBox>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function UpdateAccount() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [openModalEmail, setOpenModalEmail] = React.useState(false);
    const handleOpenModalEmail = () => setOpenModalEmail(true);
    const handleCloseModalEmail = () => setOpenModalEmail(false);

    const [openModalPass, setOpenModalPass] = React.useState(false);
    const handleOpenModalPass = () => setOpenModalPass(true);
    const handleCloseModalPass = () => setOpenModalPass(false);
    const { user, isLoading, isAuthenticated } = useAuth0();
    const [userDB, setUserDB] = useState({})
    const [image, setImage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (!isLoading) {


            if (isAuthenticated) {
                document.title = "Actualizar Cuenta";
                async function getUser() {

                    const data = await GetUserEmail(user.email);

                    if (data.email) {
                        setUserDB(data);
                    } else {
                        navigate("/")
                    }
                }
                getUser();
            } else if (!isAuthenticated) {
                navigate("/")
            }



        }

    }, [isLoading]);

    if (!Object.keys(userDB).length) return (<h1></h1>)

    const changePassword = () => {
        optionsChangePassword.data.email = user.email;
        requestChangePassword();
        setOpenAlert(true)
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const DisabledTextField = styled(TextField)(({ theme }) => ({

        '&:hover': {
            cursor: "not-allowed"
        },
        '& .MuiOutlinedInput-input': {
            cursor: "not-allowed"
        },
        '& .Mui-disabled': {
            color: "black",
        }
    }));

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setUserDB({
                ...userDB,
                "profilePic": URL.createObjectURL(event.target.files[0])
            }
            );
        }
    }

    const handleOnChangePD = (e) => {
        const { name, value } = e.target;

        setUserDB({
            ...userDB,
            [name]: value
        })
    }

    const handleOnChangeSM = (e) => {
        const { name, value } = e.target;
        let updatedsocials = { ...userDB.social }
        updatedsocials[name] = value;

        setUserDB({
            ...userDB,
            social: updatedsocials
        })
    }



    const saveUser = async () => {
        let updatedUser = userDB;
        if (image !== "") {
            const storageRef = firebaseApp.storage().ref();
            const path = storageRef.child(updatedUser._id)
            await path.put(image);
            const url = await path.getDownloadURL();
            updatedUser.profilePic = url;
        }

        const response = await UpdateUser(user.email, updatedUser);
        if (response.data.email) {
            setUserDB(response.data);
            handleCloseModalPass();
            navigate("/account/update?c=ok" + counter);
            setCounter((c) => c + 1);
        } else {
            navigate("/")
            console.log(response)
        }

    }



    const validateFacebook = (pass) => {
        return String(pass)
            .match(
                /(?:https?:\/\/)(?:www\.)(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
            );
    };

    const validateTwitter = (pass) => {
        return String(pass)
            .match(
                /(?:https?:\/\/)(?:www\.)(mbasic.twitter|m\.twitter|twitter|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
            );
    };

    const validateInstagram = (pass) => {
        return String(pass)
            .match(
                /(?:https?:\/\/)(?:www\.)(mbasic.instagram|m\.instagram|instagram|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
            );
    };

    const validateDiscord = (pass) => {
        return String(pass)
            .match(
                /^.{3,32}#[0-9]{4}$/
            );
    };


    const validateSocials = () => {
        let bool = false;
        document.getElementById("info-facebook").style.display = "none";
        document.getElementById("info-twitter").style.display = "none";
        document.getElementById("info-instagram").style.display = "none";
        document.getElementById("info-discord").style.display = "none";

        if (!validateFacebook(userDB.social.facebook) && userDB.social.facebook !== "") {
            bool = true;
            document.getElementById("info-facebook").style.display = "block";
        }
        if (!validateTwitter(userDB.social.twitter) && userDB.social.twitter !== "") {
            bool = true;
            document.getElementById("info-twitter").style.display = "block";
        }
        if (!validateInstagram(userDB.social.instagram) && userDB.social.instagram !== "") {
            bool = true;
            document.getElementById("info-instagram").style.display = "block";
        }
        if (!validateDiscord(userDB.social.discord) && userDB.social.discord !== "") {
            bool = true;
            document.getElementById("info-discord").style.display = "block";
        }
        if (!bool) {
            handleOpenModalPass()
        }
    }

    const validatePD = () => {
        let bool = false;
        document.getElementById("info-name").style.display = "none";
        document.getElementById("info-desc").style.display = "none";
        if (userDB.name.length <= 3 || userDB.name.length >= 31) {
            bool = true;
            document.getElementById("info-name").style.display = "block";
        }
        if (userDB.desc.length >= 201) {
            bool = true;
            document.getElementById("info-desc").style.display = "block";
        }
        if (!bool) {
            handleOpenModalPass()
        }
    }

    const saveUserSocialMedia = async () => {
        let updatedUser = userDB;

        const response = await UpdateUser(user.email, updatedUser);
        if (response.data.email) {
            setUserDB(updatedUser);
            handleCloseModalPass();
        } else {
            navigate("/")
            console.log(response)
        }

    }



    return (
        <ThemeProvider theme={btheme}>
            {isAuthenticated ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
            <StyledBox>
                <Typography variant="h3" mb={5}>Cuenta</Typography>
                <AppBar position="static" color='navColor'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="white_gv"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        TabIndicatorProps={{ style: { background: "white" } }}

                    >
                        <Tab label={<span style={{ color: '#FFF2EF' }}>Seguridad de la cuenta</span>} {...a11yProps(0)} />
                        <Tab label={<span style={{ color: '#FFF2EF' }}>Datos personales</span>} {...a11yProps(1)} />
                        <Tab label={<span style={{ color: '#FFF2EF' }}>Redes sociales</span>} {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>

                        <Stack direction="row" alignItems="start" spacing={2}>
                            <DisabledTextField type={"email"} helperText="Edita tu correo electrónico" id="edit-email" label="Correo electrónico" variant="outlined" fullWidth defaultValue={user.email} disabled />


                            <DisabledTextField type={"password"} helperText="Edita tu contraseña" id="edit-password" label="Contraseña" variant="outlined" fullWidth defaultValue={"---------"} disabled />
                            <label htmlFor="edit-password">
                                <IconButton onClick={handleOpenModalPass} color="buttonPrimary" component="span">
                                    <EditIcon />
                                </IconButton>
                            </label>

                            <Modal
                                aria-labelledby="transition-modal-title-pass"
                                aria-describedby="transition-modal-description-pass"
                                open={openModalPass}
                                onClose={handleCloseModalPass}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={openModalPass}>
                                    <Box sx={style}>
                                        <Typography id="transition-modal-title-pass" variant="h6" component="h2">
                                            Modificar contraseña
                                        </Typography>
                                        <Typography id="transition-modal-description-pass" sx={{ my: 2 }}>
                                            Para modificar tu contraseña necesitamos enviarte un correo electrónico.
                                        </Typography>
                                        <Typography id="transition-modal-description-pass" sx={{ my: 2 }}>
                                            Haga click en el botón de abajo para mandarle un correo electrónico.
                                        </Typography>
                                        <Button variant={"contained"} color={"buttonPrimary"} sx={{ color: "white" }} onClick={changePassword} endIcon={<SaveAltIcon />}>Mandar correo</Button>
                                        <Collapse in={openAlert}>
                                            <Alert id="alert-password" variant="filled" severity="info" sx={{ mt: 2 }}>El correo se ha mandado.</Alert>
                                        </Collapse>

                                    </Box>
                                </Fade>
                            </Modal>
                        </Stack>

                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Grid container direction={"row"} >
                            <Grid container item xs={6} md={4} justifyContent="center" alignItems="center">
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Nombre"
                                    name="name"
                                    onChange={handleOnChangePD}
                                    color={"info"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    fullWidth
                                    defaultValue={userDB.name}
                                />
                                <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-name" sx={{ display: 'none' }}>El nombre debe ser entre 4 y 30 caracteres.</Typography>
                            </Grid>

                            <Grid container item xs={6} md={4} textAlign={"center"}>
                                <Grid container item xs={12} justifyContent="center" alignItems="center" m={5}>
                                    <Avatar id="AvatarProfile" sx={{ width: "100px", height: "100px" }} src={userDB.profilePic} />
                                </Grid>
                                <Grid item xs={12}>
                                    <label htmlFor="contained-button-file">
                                        <StyledInput accept="image/*" onChange={onImageChange} id="contained-button-file" multiple type="file" />
                                        <Button variant="contained" component="span" color={"buttonPrimary"} sx={{ color: "white" }} endIcon={<PanoramaIcon />}>
                                            Subir imagen
                                        </Button>
                                    </label>
                                </Grid>


                            </Grid>

                            <Grid container item xs={6} md={4} justifyContent="center" alignItems="center">

                                <TextField
                                    id="date"
                                    label="Fecha de nacimiento"
                                    type="date"
                                    name="birthday"
                                    onChange={handleOnChangePD}
                                    color={"info"}
                                    defaultValue={userDB.birthday === "" ? "1990-01-01" : userDB.birthday}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </Grid>

                            <Grid container item xs={12} justifyContent="center" alignItems="center" >
                                <Typography variant={"h6"} sx={{ marginTop: "100px", marginBottom: "30px" }} htmlFor="descriptionAccount"> Introduce tu descripción.
                                </Typography>
                                <TextareaAutosize
                                    aria-label=""
                                    id="descriptionAccount"
                                    minRows={3}
                                    name="desc"
                                    onChange={handleOnChangePD}
                                    placeholder="Introduce tu descripción."
                                    style={{ width: "100%" }}
                                    defaultValue={userDB.desc}
                                />
                                <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-desc" sx={{ display: 'none' }}>La descripción debe tener un máximo de 200 carácteres.</Typography>

                            </Grid>

                            <Grid container item xs={12} justifyContent="center" alignItems="center" mt={15}>
                                <Button onClick={validatePD} variant={"contained"} color={"warning"} sx={{ width: "80%" }}>
                                    GUARDAR CAMBIOS
                                </Button>

                                <Modal
                                    aria-labelledby="transition-modal-title-pass"
                                    aria-describedby="transition-modal-description-pass"
                                    open={openModalPass}
                                    onClose={handleCloseModalPass}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={openModalPass}>
                                        <Box sx={style}>
                                            <Typography id="transition-modal-title-pass" variant="h6" component="h2">
                                                Datos personales
                                            </Typography>
                                            <Typography id="transition-modal-description-pass" sx={{ my: 2 }}>
                                                ¿Está seguro que quiere guardar los cambios?
                                            </Typography>
                                            <Button variant={"contained"} onClick={saveUser} color={"buttonPrimary"} sx={{ color: "white" }} endIcon={<SaveAltIcon />}>Guardar cambios</Button>

                                        </Box>
                                    </Fade>
                                </Modal>

                            </Grid>

                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <TextField
                            id="input-with-icon-textfield"
                            sx={{ marginY: "50px" }} color={"info"}
                            helperText="Introduce el enlace a tu cuenta. Ej. https://www.facebook.com/mypage"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Avatar src={facebookImage} />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            name="facebook"
                            onChange={handleOnChangeSM}
                            defaultValue={userDB.social.facebook}
                        />
                        <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-facebook" sx={{ display: 'none' }}>Introduce un enlace de Facebook válido.</Typography>

                        <TextField
                            id="input-with-icon-textfield"
                            helperText="Introduce el enlace a tu cuenta. Ej. https://twitter.com/mypage"
                            sx={{ marginY: "50px" }} color={"info"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Avatar src={twitterImage} />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            name="twitter"
                            onChange={handleOnChangeSM}
                            defaultValue={userDB.social.twitter}
                        />
                        <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-twitter" sx={{ display: 'none' }}>Introduce un enlace de Twitter válido.</Typography>

                        <TextField
                            id="input-with-icon-textfield"
                            sx={{ marginY: "50px" }} color={"info"}
                            helperText="Introduce el enlace a tu cuenta. Ej. https://www.instagram.com/mypage"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Avatar src={instagramImage} />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            name="instagram"
                            onChange={handleOnChangeSM}
                            defaultValue={userDB.social.instagram}
                        />

                        <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-instagram" sx={{ display: 'none' }}>Introduce un enlace de Instagram válido.</Typography>


                        <TextField
                            id="input-with-icon-textfield"
                            helperText="Introduce tu ID de Discord. Ej: Prueba#1111"
                            sx={{ marginY: "50px" }} color={"info"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Avatar src={discordImage} />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            name="discord"
                            onChange={handleOnChangeSM}
                            defaultValue={userDB.social.discord}
                        />
                        <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-discord" sx={{ display: 'none' }}>Introduce un ID de Discord válido.</Typography>

                        <Box textAlign="center">
                            <Button onClick={validateSocials} sx={{ width: "80%" }} variant={"contained"} color={"warning"}>
                                GUARDAR CAMBIOS
                            </Button>
                        </Box>


                        <Modal
                            aria-labelledby="transition-modal-title-pass"
                            aria-describedby="transition-modal-description-pass"
                            open={openModalPass}
                            onClose={handleCloseModalPass}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openModalPass}>
                                <Box sx={style}>
                                    <Typography id="transition-modal-title-pass" variant="h6" component="h2">
                                        Redes Sociales
                                    </Typography>
                                    <Typography id="transition-modal-description-pass" sx={{ my: 2 }}>
                                        ¿Está seguro que quiere guardar los cambios?
                                    </Typography>
                                    <Button variant={"contained"} onClick={saveUserSocialMedia} color={"buttonPrimary"} sx={{ color: "white" }} endIcon={<SaveAltIcon />}>Guardar cambios</Button>
                                </Box>
                            </Fade>
                        </Modal>
                    </TabPanel>
                </SwipeableViews>
            </StyledBox>
        </ThemeProvider>
    );
}
