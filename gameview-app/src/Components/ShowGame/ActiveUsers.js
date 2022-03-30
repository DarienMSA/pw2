import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Snackbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'



export default function ActiveUsers() {
    const [socialWebsAnchor, setSocialWebsAnchor] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const isSocialWebsOpen = Boolean(socialWebsAnchor);

    const handleSocialWebsClose = () => {
        setSocialWebsAnchor(null);
    };

    const handleSocialWebsOpen = (event) => {
        setSocialWebsAnchor(event.currentTarget);
    };

    const handleClick = d => () => {
        console.log(d);
        navigator.clipboard.writeText(d);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    const SocialWebsMenu = 'social-webs-menu';
    const renderSocialWebMenu = (
        <Menu
            anchorEl={socialWebsAnchor}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={SocialWebsMenu}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isSocialWebsOpen}
            onClose={handleSocialWebsClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="Facebook" color="inherit">
                    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" />
                </IconButton>
                <p>Facebook</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="Facebook" color="inherit">
                    <Avatar src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" />
                </IconButton>
                <p>Twitter</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="Facebook" color="inherit">
                    <Avatar src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png" />
                </IconButton>
                <p>Instagram</p>
            </MenuItem>
            <MenuItem onClick={handleClick("Daze#7023")}>
                <IconButton size="large" aria-label="Facebook" color="inherit">
                    <Avatar src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-7-1.png" />
                </IconButton>
                <p>Discord</p>

            </MenuItem>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="La cuenta se ha copiado en el portapapeles (Daze#7023)"
                action={action}
            />

        </Menu>
    );
    return (
        <Grid container sx={{ borderStyle: "solid", borderWidth: 5, borderRadius: 5, marginY: 1 }} alignItems={"center"} justifyContent={"space-between"}>

            <Avatar sx={{ marginLeft: 2, marginY: 2, width: 70, height: 70 }} src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" ></Avatar>
            <Typography variant="h5">
                Darien Miguel Sánchez Arévalo
            </Typography>
            <Avatar sx={{ marginRight: 2, marginTop: 5, cursor: "pointer" }} onClick={handleSocialWebsOpen} aria-controls={SocialWebsMenu}>+</Avatar>


            {renderSocialWebMenu}
        </Grid>
    )
}