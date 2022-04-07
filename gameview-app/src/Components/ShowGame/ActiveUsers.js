import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Snackbar, styled, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

const StyledTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        maxWidth: "280px"
    },
    [theme.breakpoints.up('md')]: {


    },
    [theme.breakpoints.up('lg')]: {

    },

}));

const StyledAvatar2 = styled(Avatar)(({ theme }) => ({
    marginRight: 20, marginLeft: 2, marginY: 2,
    [theme.breakpoints.down('md')]: {
        width: 40, height: 40,
    },
    [theme.breakpoints.up('md')]: {
        width: 70, height: 70,

    },
    [theme.breakpoints.up('lg')]: {
        width: 70, height: 70,
    },

}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
    },
    [theme.breakpoints.up('md')]: {
        marginLeft: 100,

    },
    [theme.breakpoints.up('lg')]: {
        marginLeft: 150,
    },

}));


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
        <Grid container sx={{ marginY: 3 }} alignItems={"center"}>

            <StyledAvatar2 sx={{}} src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" ></StyledAvatar2>
            <StyledTypography mb={3} variant="h5" color={"white"} noWrap>
                Darien Miguel Sánchez Arévalo
            </StyledTypography>
            <StyledAvatar sx={{ marginTop: 5, cursor: "pointer", bgcolor: "#6998AB", height: 30, width: 30 }} onClick={handleSocialWebsOpen} aria-controls={SocialWebsMenu}>+</StyledAvatar>


            {renderSocialWebMenu}
        </Grid>
    )
}
