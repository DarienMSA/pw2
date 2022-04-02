import { styled } from '@mui/material/styles';
import { Divider, Grid, Paper, Typography } from '@mui/material'

import { red, green, blue } from '@mui/material/colors';
import React, { Fragment } from 'react'



const ToMessagePaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#B1D0E0", //#6998AB
    borderRadius: 0,
    borderStartEndRadius: 25,
    borderStartStartRadius: 25,
    borderEndEndRadius: 25,
    [theme.breakpoints.down('md')]: {
        maxWidth: "25vh"
    },
    [theme.breakpoints.up('md')]: {
        maxWidth: "50vh"
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: "100vh"
    },

}));

export default function ToMessage() {
    return (
        <Fragment>
            <Grid container margin={1} sx={{ marginTop: "25px" }}>
                <ToMessagePaper  >
                    <Typography margin={2}>Muchas gracias por contestarme.Muchas gracias por contestarme.Muchas gracias por contestarme.Muchas gracias por contestarme.</Typography>
                    <Typography variant="caption" margin={2}>01:40pm</Typography>
                </ToMessagePaper>
            </Grid>
            <Divider variant="middle" sx={{ marginTop: "25px" }} />
        </Fragment>
    )
}
