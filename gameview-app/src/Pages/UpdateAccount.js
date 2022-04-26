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
import { Avatar, Button, Divider, Grid, IconButton, Stack, TextField, styled, Modal, Fade, Backdrop, InputAdornment, TextareaAutosize, InputLabel, ThemeProvider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PanoramaIcon from '@mui/icons-material/Panorama';
import DescriptionIcon from '@mui/icons-material/Description';
import btheme from '../Components/GameView-Theme';
import LoggedBar from '../Components/loggedBar';
import UnloggedBar from '../Components/unloggedBar';
import { GetUser, UpdateUser } from '../Services/UserServices';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../fb';

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

    const session = localStorage.getItem("UserSession");
    const [user, setUser] = useState({})
    const [userSocials, setUserSocials] = useState({})
    const [image, setImage] = useState("");
    useEffect(() => {
        if (session === null) {
            navigate("/")
        } else {
            async function getUser() {

                const data = await GetUser(session);

                if (data.email) {
                    setUser(data);
                    setUserSocials(data.social)
                } else {
                    navigate("/")
                    console.log("error")
                }
            }
            getUser();
        }



    }, []);

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
            setUser({
                ...user,
                "profilePic": URL.createObjectURL(event.target.files[0])
            }
            );
        }
    }

    const handleOnChangePD = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleOnChangeSM = (e) => {
        const { name, value } = e.target;

        setUserSocials({
            ...userSocials,
            [name]: value
        })
    }



    const saveUser = async () => {
        let updatedUser = user;
        if (image !== "") {
            const storageRef = firebaseApp.storage().ref();
            const path = storageRef.child(updatedUser._id)
            await path.put(image);
            const url = await path.getDownloadURL();
            updatedUser.profilePic = url;
        }

        const response = await UpdateUser(session, updatedUser);
        if (response.data.email) {
            setUser(updatedUser);
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
        if (!validateFacebook(userSocials.facebook) && userSocials.facebook !== "") {
            bool = true;
            document.getElementById("info-facebook").style.display = "block";
        }
        if (!validateTwitter(userSocials.twitter) && userSocials.twitter !== "") {
            bool = true;
            document.getElementById("info-twitter").style.display = "block";
        }
        if (!validateInstagram(userSocials.instagram) && userSocials.instagram !== "") {
            bool = true;
            document.getElementById("info-instagram").style.display = "block";
        }
        if (!validateDiscord(userSocials.discord) && userSocials.discord !== "") {
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
        if (user.name.length <= 3 || user.name.length >= 31) {
            bool = true;
            document.getElementById("info-name").style.display = "block";
        }
        if (user.desc.length >= 201) {
            bool = true;
            document.getElementById("info-desc").style.display = "block";
        }
        if (!bool) {
            handleOpenModalPass()
        }
    }

    const saveUserSocialMedia = async () => {
        let updatedUser = user;
        updatedUser.social = userSocials;

        const response = await UpdateUser(session, updatedUser);
        if (response.data.email) {
            setUser(updatedUser);
        } else {
            navigate("/")
            console.log(response)
        }

    }



    return (
        <ThemeProvider theme={btheme}>
            {session !== null ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
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
                            <label htmlFor="edit-email">
                                <IconButton onClick={handleOpenModalEmail} color="buttonPrimary" component="span">
                                    <EditIcon />
                                </IconButton>
                            </label>

                            <Modal
                                aria-labelledby="transition-modal-title-email"
                                aria-describedby="transition-modal-description-email"
                                open={openModalEmail}
                                onClose={handleCloseModalEmail}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={openModalEmail}>
                                    <Box sx={style}>
                                        <Typography id="transition-modal-title-email" variant="h6" component="h2">
                                            Modificar correo
                                        </Typography>
                                        <Typography id="transition-modal-description-email" sx={{ mt: 2 }}>
                                            <StyledTextField sx={{ marginY: 5 }} type={"email"} helperText="Introduce un nuevo correo electrónico" id="edit-email" label="Correo electrónico" variant="outlined" fullWidth />
                                            <StyledTextField sx={{ marginY: 5 }} type={"password"} helperText="Escribe tu contraseña" id="edit-email" label="Verifica contraseña" variant="outlined" fullWidth />
                                        </Typography>
                                        <Button variant={"contained"} color={"buttonPrimary"} sx={{ color: "white" }} endIcon={<SaveAltIcon />}>Guardar cambios</Button>
                                    </Box>
                                </Fade>
                            </Modal>

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
                                        <Typography id="transition-modal-description-pass" sx={{ mt: 2 }}>
                                            <StyledTextField sx={{ marginY: 5 }} type={"password"} helperText="Introduce una nueva contraseña" id="edit-password" label="Contraseña" variant="outlined" fullWidth />
                                            <StyledTextField sx={{ marginY: 5 }} type={"password"} helperText="Escribe tu contraseña" id="edit-email" label="Verifica contraseña" variant="outlined" fullWidth />
                                        </Typography>
                                        <Button variant={"contained"} color={"buttonPrimary"} sx={{ color: "white" }} endIcon={<SaveAltIcon />}>Guardar cambios</Button>
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
                                    defaultValue={user.name}
                                />
                                <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-name" sx={{ display: 'none' }}>El nombre debe ser entre 4 y 30 caracteres.</Typography>
                            </Grid>

                            <Grid container item xs={6} md={4} textAlign={"center"}>
                                <Grid container item xs={12} justifyContent="center" alignItems="center" m={5}>
                                    <Avatar id="AvatarProfile" sx={{ width: "100px", height: "100px" }} src={user.profilePic} />
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
                                    defaultValue={user.birthday}
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
                                    defaultValue={user.desc}
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
                                            <Typography id="transition-modal-description-pass" sx={{ mt: 2 }}>

                                                <StyledTextField sx={{ marginY: 5 }} type={"password"} helperText="Escribe tu contraseña" id="edit-email" label="Verifica contraseña" variant="outlined" fullWidth />
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
                                        <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            name="facebook"
                            onChange={handleOnChangeSM}
                            defaultValue={userSocials.facebook}
                        />
                        <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-facebook" sx={{ display: 'none' }}>Introduce un enlace de Facebook válido.</Typography>

                        <TextField
                            id="input-with-icon-textfield"
                            helperText="Introduce el enlace a tu cuenta. Ej. https://twitter.com/mypage"
                            sx={{ marginY: "50px" }} color={"info"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Avatar src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            name="twitter"
                            onChange={handleOnChangeSM}
                            defaultValue={userSocials.twitter}
                        />
                        <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-twitter" sx={{ display: 'none' }}>Introduce un enlace de Twitter válido.</Typography>

                        <TextField
                            id="input-with-icon-textfield"
                            sx={{ marginY: "50px" }} color={"info"}
                            helperText="Introduce el enlace a tu cuenta. Ej. https://www.instagram.com/mypage"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Avatar src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            name="instagram"
                            onChange={handleOnChangeSM}
                            defaultValue={userSocials.instagram}
                        />

                        <Typography variant="caption" color={"#F55353"} fontWeight="bold" id="info-instagram" sx={{ display: 'none' }}>Introduce un enlace de Instagram válido.</Typography>


                        <TextField
                            id="input-with-icon-textfield"
                            helperText="Introduce tu ID de Discord. Ej: Prueba#1111"
                            sx={{ marginY: "50px" }} color={"info"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Avatar src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-7-1.png" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            fullWidth
                            name="discord"
                            onChange={handleOnChangeSM}
                            defaultValue={userSocials.discord}
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
                                    <Typography id="transition-modal-description-pass" sx={{ mt: 2 }}>

                                        <StyledTextField sx={{ marginY: 5 }} type={"password"} helperText="Escribe tu contraseña" id="edit-email" label="Verifica contraseña" variant="outlined" fullWidth />
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
