import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';

import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchBar from './SearchBar';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, Divider, ThemeProvider, Tooltip } from '@mui/material';
import NotifItem from './NavBar/NotifItem';
import btheme from './GameView-Theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetUser, GetUserEmail } from '../Services/UserServices';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from './Auth0/LogoutButton.';
import { GetSeenChat } from '../Services/ChatServices';
import { GetUserNotifications, GetUserNotificationsActive, setActiveAllNotification } from '../Services/NotificationServices';




export default function LoggedBar() {
    const navigate = useNavigate();


    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNotif, setAnchorElNotif] = React.useState(null);
    const [anchorElNotifMobile, setAnchorElNotifMobile] = React.useState(null);
    const { user, isLoading } = useAuth0();
    const [userDB, setUserDB] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [numOfMessages, setNumOfMessages] = useState(0);
    const { search } = useLocation();
    const searchParams = new URLSearchParams((search));

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    useEffect(() => {
        if (!isLoading) {
            async function getUserNotifs(id) {

                const data = await GetUserNotifications(id)
                setNotifications(data);
                const data2 = await GetUserNotificationsActive(id);
                setNotificationsLength(data2.length)
            }

            async function getNumberOfMessages(id) {

                const data = await GetSeenChat(id)
                setNumOfMessages(data.number);
                getUserNotifs(id)
            }
            async function getUser() {
                const data = await GetUserEmail(user.email);
                if (data.email) {
                    setUserDB(data);
                    getNumberOfMessages(data._id)
                } else {
                    navigate("/")
                    console.log(data)
                }
            }


            getUser();
        }



    }, [isLoading, searchParams.get("c")]);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };



    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNotifMenu = (event) => {
        setAnchorElNotif(event.currentTarget);
        setNotifActive();
    };



    const handleCloseNotifMenu = () => {
        setAnchorElNotif(null);
    };

    const handleOpenNotifMobileMenu = (event) => {
        setAnchorElNotifMobile(event.currentTarget);
        setNotifActive();
    };


    const setNotifActive = () => {
        async function notifActive() {
            const data = await setActiveAllNotification(userDB._id)
            setNotificationsLength(0)
        }
        notifActive();
    }


    const handleCloseNotifMobileMenu = () => {
        //mobile
        setAnchorElNotifMobile(null);
    };

    const closeMenuNotif = n => () => {
        handleCloseNotifMobileMenu()
        handleCloseNotifMenu()
        if (n.origin === "like" || n.origin === "comment") {
            navigate("/browse/game?id=" + n.fromGame._id)
        }
    }

    const logOut = url => () => {
        localStorage.removeItem("UserSession");
        handleCloseUserMenu();
        handleCloseNotifMobileMenu();
        navigate(url);
    }


    const navigateFunction = url => () => {
        handleCloseUserMenu();
        handleCloseNotifMobileMenu();
        navigate(url);

    };






    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new messages" color="inherit">
                    <Badge badgeContent={numOfMessages} color="error">
                        <ChatIcon />
                    </Badge>
                </IconButton>
                <p>Mensajes</p>
            </MenuItem>
            <MenuItem onClick={handleOpenNotifMobileMenu}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"

                >
                    <Badge badgeContent={notificationsLength} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notificaciones</p>
            </MenuItem>
            <MenuItem onClick={navigateFunction("/account")}>
                <IconButton
                    size="large"

                    color="inherit"

                >
                    <AccountCircle />
                </IconButton>
                <p>Perfil</p>
            </MenuItem>

            <LogoutButton />

            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElNotifMobile}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElNotifMobile)}
                onClose={handleCloseNotifMobileMenu}
            >



                {
                    notifications.map((notification, index) => (


                        <MenuItem key={index} onClick={closeMenuNotif(notification)}>
                            <NotifItem notif={notification} key={index} />
                        </MenuItem>

                    ))
                }



            </Menu>
        </Menu>
    );


    return (
        <ThemeProvider theme={btheme}>


            <Box sx={{ flexGrow: 1 }}>
                <AppBar color='navColor' sx={{ position: 'static' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <img width={130} onClick={navigateFunction("/")} style={{ marginTop: 10, cursor: "pointer" }} src="https://media.discordapp.net/attachments/928138608894967828/958872190013567006/Logo_nav_noBG.png"></img>
                        </Typography>
                        <SearchBar />

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={navigateFunction("/chat")}>
                                <Badge badgeContent={numOfMessages} color="error">
                                    <ChatIcon color={"white_gv"} />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={handleOpenNotifMenu}
                            >
                                <Badge badgeContent={notificationsLength} color="error">
                                    <NotificationsIcon color={"white_gv"} />
                                </Badge>
                            </IconButton>
                            <Box sx={{ flexGrow: 0, marginLeft: '15px' }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={userDB.profilePic}></Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={navigateFunction("/account")}>
                                        <Typography textAlign="center">Perfil</Typography>
                                    </MenuItem>
                                    <LogoutButton></LogoutButton>
                                </Menu>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElNotif}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElNotif)}
                                    onClose={handleCloseNotifMenu}
                                >

                                    {
                                        notifications.map((notification, index) => (


                                            <MenuItem key={index} onClick={closeMenuNotif(notification)}>
                                                <NotifItem notif={notification} key={index} />
                                            </MenuItem>




                                        ))
                                    }
                                </Menu>
                            </Box>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="white_gv"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </Box>
        </ThemeProvider>
    )
}
