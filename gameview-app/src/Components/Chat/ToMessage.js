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

export default function ToMessage(props) {
    return (
        <Fragment>
            <Grid container margin={1} sx={{ marginTop: "25px" }}>
                <ToMessagePaper elevation={2}>
                    <Typography margin={2}>{props.msg.content}</Typography>
                    <Typography variant="caption" margin={2}>{props.msg.messageDate}</Typography>
                </ToMessagePaper>
            </Grid>

        </Fragment>
    )
}
