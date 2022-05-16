
import { alpha, Avatar, Badge, Divider, Grid, styled, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: 'red',
        color: 'red',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: "purple"
        }
    }
}));

const StyledGrid = styled(Grid)(() => ({

    marginTop: "5px",
    marginBottom: "10px",
    marginLeft: "5px",
    backgroundColor: "#6998AB", //#B1D0E0
    '&:hover': {
        cursor: "pointer",
        backgroundColor: "#AFC3DF",
    },
}));



export default function UserPreview(props) {
    const navigate = useNavigate();
    const otherUserData = props.actualUser._id === props.c.members[0]._id ? props.c.members[1] : props.c.members[0]
    const badgeVariant = props.c.seen ? "standard" : "dot"

    const isFromUser = props.c.lastMessageFrom === props.actualUser._id ? true : false


    const navigateFunction = url => () => {
        navigate(url);

    };
    return (
        <StyledGrid container onClick={navigateFunction(`/chat?c=${props.c._id}&u=${otherUserData._id}`)}>

            <Grid container item xs={3} sm={3} md={3} marginTop={3} marginBottom={3}
                direction="row"
                justifyContent="center"
                alignItems="center"

            >
                {
                    isFromUser ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            variant={"standard"}

                        >
                            <Avatar textAlign="center" alt={otherUserData.name} src={otherUserData.profilePic} />
                        </StyledBadge>
                    ) : (<StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        variant={badgeVariant}

                    >
                        <Avatar textAlign="center" alt={otherUserData.name} src={otherUserData.profilePic} />
                    </StyledBadge>)
                }




            </Grid>
            <Grid container item xs={9} sm={9} md={9} sx={{ display: { md: 'grid' } }}
                direction="row"
                justifyContent="start"
                alignItems="center">
                <Typography textAlign={"left"} fontWeight={"bold"} width={"100%"} noWrap> {`${otherUserData.name} | ${otherUserData.email}`} </Typography>
                <Typography textAlign={"left"} variant="caption" width={"100%"} noWrap>{props.c.lastMessage}</Typography>
                <Divider variant="middle" />
                <Typography textAlign={"left"} variant="caption" mr={4} fontWeight={"bold"} noWrap>{props.c.lastMessageDate} </Typography>

            </Grid>
        </StyledGrid >


    )
}
