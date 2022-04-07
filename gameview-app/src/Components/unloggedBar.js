import React, { Fragment } from 'react'
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Stack, Tab, Tabs, ThemeProvider, Toolbar, Typography } from '@mui/material'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import LoginIcon from '@mui/icons-material/Login';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchBar from './SearchBar';
import btheme from './GameView-Theme';

export default function UnloggedBar() {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
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
                <IconButton size="large" color="inherit">
                    <LoginIcon />
                </IconButton>
                <p>Iniciar sesión</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <PersonAddAltRoundedIcon />
                </IconButton>
                <p>Registrarse</p>
            </MenuItem>
        </Menu>
    );


    return (
        <ThemeProvider theme={btheme}>
            <Fragment>
                <AppBar color='navColor' sx={{ position: 'static' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <img width={130} onClick={handleClickLogo} style={{ marginTop: 10, cursor: "pointer" }} src="https://media.discordapp.net/attachments/928138608894967828/958872190013567006/Logo_nav_noBG.png"></img>
                        </Typography>
                        <SearchBar />
                        <Stack color='#FFF2EF' direction="row" alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button sx={{ marginLeft: "auto" }} color="inherit" endIcon={<LoginIcon />}>
                                INICIAR SESIÓN{" "}
                            </Button>
                            <Button sx={{ marginLeft: "10px" }} color="inherit" endIcon={<PersonAddAltRoundedIcon />}>
                                REGISTRARSE{" "}
                            </Button>
                        </Stack>
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
            </Fragment>
        </ThemeProvider>
    )
}
