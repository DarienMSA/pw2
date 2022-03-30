import { styled } from '@mui/material/styles';
import { Divider, Grid, Paper, Typography } from '@mui/material'

import { red, green, blue } from '@mui/material/colors';
import React, { Fragment } from 'react'
import { Box } from '@mui/system';



const FromMessagePaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#063970",
    color: "white",
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

export default function FromMessage() {
    return (
        <Fragment sx={{ backgroundColor: "#9193A1" }} >
            <Grid container margin={1} direction="row-reverse" sx={{ marginTop: "25px" }}>
                <FromMessagePaper elevation={4}>
                    <Typography margin={2}>Muchas gracias por contestarme.Muchas gracias por contestarme.Muchas gracias por contestarme.Muchas gracias por contestarme.</Typography>
                    <Box textAlign="end">
                        <Typography variant="caption" margin={2}>01:40pm</Typography>
                    </Box>
                </FromMessagePaper>
            </Grid>
            <Divider variant="middle" sx={{ marginTop: "25px" }} />
        </Fragment>
    )
}