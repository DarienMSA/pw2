import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Snackbar, styled, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import facebookImage from '../../Assets/facebook.png';
import instagramImage from '../../Assets/instagram.png';
import twitterImage from '../../Assets/twitter.png';
import discordImage from '../../Assets/discord.png';
import { useNavigate } from 'react-router-dom';

const StyledTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        width: "280px"
    },
    [theme.breakpoints.up('md')]: {
        width: 450

    },
    [theme.breakpoints.up('lg')]: {
        width: 530
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
        width: 70, height: 70
    },

}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {

    },
    [theme.breakpoints.up('md')]: {


    },
    [theme.breakpoints.up('lg')]: {

    },

}));


export default function ActiveUsers(props) {
    const [socialWebsAnchor, setSocialWebsAnchor] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [discordMessage, setDiscordMessage] = useState("")
    const navigate = useNavigate();
    const isSocialWebsOpen = Boolean(socialWebsAnchor);

    const handleSocialWebsClose = () => {
        setSocialWebsAnchor(null);
    };

    const handleSocialWebsOpen = (event) => {
        setSocialWebsAnchor(event.currentTarget);
    };

    const handleClick = d => () => {

        if (d != "") {
            setDiscordMessage(`La cuenta se ha copiado en el portapapeles (${d})`)
            navigator.clipboard.writeText(d);
        }
        else
            setDiscordMessage(`Este usuario no tiene disponible su cuenta de Discord.`)
        setOpen(true);
    };

    const onClickSocialMedia = url => () => {
        if (url !== "")
            window.open(url, '_blank');
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const goNavigate = url => () => {
        navigate(url)
    }

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
                    <Avatar onClick={onClickSocialMedia(props.user.social.facebook)} src={facebookImage} />
                </IconButton>
                <p>Facebook</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="Facebook" color="inherit">
                    <Avatar onClick={onClickSocialMedia(props.user.social.twitter)} src={twitterImage} />
                </IconButton>
                <p>Twitter</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="Facebook" color="inherit">
                    <Avatar onClick={onClickSocialMedia(props.user.social.instagram)} src={instagramImage} />
                </IconButton>
                <p>Instagram</p>
            </MenuItem>
            <MenuItem onClick={handleClick(props.user.social.discord)}>
                <IconButton size="large" aria-label="Facebook" color="inherit">
                    <Avatar src={discordImage} />
                </IconButton>
                <p>Discord</p>

            </MenuItem>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={discordMessage}
                action={action}
            />

        </Menu>
    );
    return (
        <Grid container sx={{ marginY: 3 }} alignItems={"center"}>

            <StyledAvatar2 sx={{ cursor: "pointer" }} onClick={goNavigate(`/account?u=${props.user._id}`)} src={props.user.profilePic} ></StyledAvatar2>
            <StyledTypography mb={3} variant="h5" color={"white"} noWrap>
                {props.user.name}
            </StyledTypography>
            <StyledAvatar sx={{ marginTop: 5, cursor: "pointer", bgcolor: "#6998AB", height: 30, width: 30 }} onClick={handleSocialWebsOpen} aria-controls={SocialWebsMenu}>+</StyledAvatar>


            {renderSocialWebMenu}
        </Grid>
    )
}
