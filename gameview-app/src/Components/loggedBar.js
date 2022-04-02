import React from 'react'
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
import { Avatar, Divider, Tooltip } from '@mui/material';
import NotifItem from './NavBar/NotifItem';

const settings = ['Perfil', 'Cerrar sesión'];



export default function LoggedBar() {

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNotif, setAnchorElNotif] = React.useState(null);
    const [anchorElNotifMobile, setAnchorElNotifMobile] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
    };



    const handleCloseNotifMenu = () => {
        setAnchorElNotif(null);
    };

    const handleOpenNotifMobileMenu = (event) => {
        setAnchorElNotifMobile(event.currentTarget);
    };



    const handleCloseNotifMobileMenu = () => {
        setAnchorElNotifMobile(null);
    };

    const handleClickLogo = () => {
        alert("me clicaste aaa");
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
                    <Badge badgeContent={4} color="error">
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
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notificaciones</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"

                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Perfil</p>
            </MenuItem>

            <MenuItem>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
                <p>Cerrar sesión</p>
            </MenuItem>

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
                <MenuItem onClick={handleCloseNotifMobileMenu}>

                    <NotifItem />

                </MenuItem>
            </Menu>
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color='navColor' sx={{ position: 'static' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <img width={130} onClick={handleClickLogo} style={{ marginTop: 10, cursor: "pointer" }} src="https://media.discordapp.net/attachments/928138608894967828/958872190013567006/Logo_nav_noBG.png"></img>
                    </Typography>
                    <SearchBar />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <ChatIcon color={"white_gv"} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={handleOpenNotifMenu}
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon color={"white_gv"} />
                            </Badge>
                        </IconButton>
                        <Box sx={{ flexGrow: 0, marginLeft: '15px' }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
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
                                <Divider variant="middle" />
                                <MenuItem key={1} onClick={handleCloseNotifMenu}>
                                    <NotifItem />
                                </MenuItem>
                                <Divider variant="middle" />
                                <Divider variant="middle" />
                                <MenuItem key={2} onClick={handleCloseNotifMenu}>
                                    <NotifItem />
                                </MenuItem>
                                <Divider variant="middle" />
                                <Divider variant="middle" />
                                <MenuItem key={3} onClick={handleCloseNotifMenu}>
                                    <NotifItem />
                                </MenuItem>
                                <Divider variant="middle" />
                                <Divider variant="middle" />
                                <MenuItem key={4} onClick={handleCloseNotifMenu}>
                                    <NotifItem />
                                </MenuItem>
                                <Divider variant="middle" />
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
    )
}
