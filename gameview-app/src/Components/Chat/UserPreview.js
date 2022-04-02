
import { alpha, Avatar, Badge, Divider, Grid, styled, Typography } from '@mui/material'
import React from 'react'

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
    borderStyle: 'groove',
    borderWidth: "5px",
    borderColor: "#063970",
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#6998AB", //#B1D0E0
    '&:hover': {
        cursor: "pointer",
        backgroundColor: "#AFC3DF",
    },
}));



export default function UserPreview() {
    return (
        <StyledGrid container>

            <Grid container item xs={3} sm={3} md={3} marginTop={3} marginBottom={3}
                direction="row"
                justifyContent="center"
                alignItems="center"

            >
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    variant="dot"

                >
                    <Avatar textAlign="center" alt="Remy Sharp" src="https://cdn.discordapp.com/attachments/782076463427878956/956035809994231868/FEaAt5RXEAouBTO_1.jpeg" />
                </StyledBadge>



            </Grid>
            <Grid container item xs={9} sm={9} md={9} sx={{ display: { md: 'grid' } }}
                direction="row"
                justifyContent="start"
                alignItems="center">
                <Typography textAlign={"left"} fontWeight={"bold"} width={"100%"} noWrap>Darien Miguel Sánchez Arévalo </Typography>
                <Typography textAlign={"left"} variant="caption" width={"100%"} noWrap>asdasdasdasdad</Typography>
                <Divider variant="middle" />
                <Typography textAlign={"right"} variant="caption" mr={4} fontWeight={"bold"} noWrap>23/03/2022 </Typography>

            </Grid>
        </StyledGrid >


    )
}
