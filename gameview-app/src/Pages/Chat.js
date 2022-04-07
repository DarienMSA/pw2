import { Divider, Grid, styled, alpha, InputBase, Autocomplete, TextField, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import ToMessage from '../Components/Chat/ToMessage';
import SendIcon from '@mui/icons-material/Send';
import UserPreview from '../Components/Chat/UserPreview'
import FromMessage from '../Components/Chat/FromMessage';

//style={{ borderStyle: "solid", borderColor: "blue", borderWidth: "1px" }}

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,

    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: '0',
    flexGrow: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    "& .MuiInputBase-input.MuiAutocomplete-input": {
        color: "white",
    },
    "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
        color: "white",
    },
    "& .MuiSvgIcon-root": {
        color: "white",
    },

    "& .MuiInputLabel-root": {
        color: "white",
    },
    marginTop: "5px",
    marginBottom: "15px"
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    "& .MuiFilledInput-root": {
        backgroundColor: "#E3EAEE",
    }
}));

export default function Chat() {

    return (
        <Fragment>

            <Grid container maxHeight="93vh">

                <Grid item xs={12} md={3} backgroundColor="#1A374D" style={{ overflow: "auto", overflowX: "hidden", maxHeight: "93vh" }}>
                    <StyledAutocomplete
                        id="combo-box-demo"
                        options={usedList}
                        renderInput={(params) => <TextField {...params} label="Buscar usuarios..." />}

                    />
                    <UserPreview></UserPreview>

                    <UserPreview></UserPreview>

                    <UserPreview></UserPreview>

                    <UserPreview></UserPreview>



                </Grid>
                <Grid container xs={12} md={9} style={{ maxHeight: "93vh", background: "#E3EAEE" }}>
                    <Grid item xs={12} style={{
                        height: "86vh", borderStyle: 'solid',
                        borderWidth: "5px",
                        borderColor: "#1A374D", overflow: "auto", overflowX: "hidden", display: "flex",
                        flexDirection: "column-reverse"
                    }} >
                        <ToMessage />
                        <FromMessage />
                        <ToMessage />
                        <ToMessage />
                        <ToMessage />
                        <FromMessage />
                        <FromMessage />
                        <ToMessage />
                        <FromMessage />



                    </Grid>

                    <Grid container item xs={12} style={{
                        height: "7vh", borderStyle: 'solid',
                        borderWidth: "5px",
                        borderColor: "#1A374D", overflow: "auto", overflowX: "hidden"
                    }}
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid xs={11}>
                            <StyledTextField id="filled-basic" label="Escribe un mensaje..." variant="filled" />
                        </Grid>
                        <Grid xs={1} textAlign="center">
                            <IconButton color="from_message" component="span">
                                <SendIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Fragment >
    )
}

const usedList = [
    { label: 'Darien Miguel Sánhcez Arévalo' },
    { label: 'Leonardo Daniel Rangel Santoyo' },
    { label: 'Manuel Amaury Mendoza García' }

]
