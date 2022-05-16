import { styled } from '@mui/material/styles';
import { Divider, Grid, Paper, Typography } from '@mui/material'

import { red, green, blue } from '@mui/material/colors';
import React, { Fragment } from 'react'
import { Box } from '@mui/system';



const FromMessagePaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#063970",
    borderRadius: 0,
    borderStartEndRadius: 25,
    borderStartStartRadius: 25,
    borderEndStartRadius: 25,
    color: "white",
    marginRight: 20,
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

export default function FromMessage(props) {
    return (
        <Fragment>
            <Grid container margin={1} direction="row-reverse" justifyContent={"flex-start"} sx={{ marginTop: "25px" }}>
                <FromMessagePaper elevation={2}>
                    <Typography margin={2}>{props.msg.content}</Typography>
                    <Box textAlign="end">
                        <Typography variant="caption" margin={2}>{props.msg.messageDate}</Typography>
                    </Box>
                </FromMessagePaper>
            </Grid>

        </Fragment>
    )
}