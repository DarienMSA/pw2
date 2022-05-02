import { alpha, Divider, Grid, Pagination, styled, ThemeProvider, Typography } from '@mui/material'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BrowserCard from '../Components/Browser/BrowserCard'
import btheme from '../Components/GameView-Theme';
import LoggedBar from '../Components/loggedBar';
import UnloggedBar from '../Components/unloggedBar';
import { GetGamesSortedBy, GetGamesByName } from '../Services/GameServices';

const StyledPagination = styled(Pagination)(({ theme }) => ({



    '& .MuiPaginationItem-root': {
        background: "#FFF2EF",
        '&:hover': {
            backgroundColor: alpha("#FFF2EF", 0.25), //white_gv
        },
    }
}));

export default function Browser() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams((search));
    const session = localStorage.getItem("UserSession");
    const itemsPerPage = 6;
    const [page, setPage] = React.useState(1);
    const [noOfPages, setNoOfPages] = React.useState(1);

    const [games, setGames] = useState([]);
    const mountedRef = useRef(true)
    async function GetGamesSorted() {
        const data = await GetGamesSortedBy("name");
        setGames(data);
        setNoOfPages(Math.ceil(data.length / itemsPerPage));
    }

    async function GetGamesName() {
        const data = await GetGamesByName(searchParams.get("v"));
        setGames(data);
        setNoOfPages(Math.ceil(data.length / itemsPerPage));
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {

        if (searchParams.has("v"))
            GetGamesName()
        else
            GetGamesSorted();

        return () => {
            mountedRef.current = false
        }
    }, [searchParams.get("v")]);

    return (
        <ThemeProvider theme={btheme}>
            {session !== null ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}

            <Fragment>

                <Grid container>
                    <Grid>

                        {searchParams.has("v") && (
                            <Typography variant="h4" sx={{ mt: 2.5, ml: 25 }}>Resultados de Búsqueda: {searchParams.get("v")}</Typography>
                        )}
                        {searchParams.has("v") || (
                            <Typography variant="h4" sx={{ mt: 2.5, ml: 25 }}>Mostrándose todos los juegos:</Typography>
                        )}


                    </Grid>
                </Grid>
                <Divider variant="inset" sx={{ mb: 1.5, mt: 0.5 }} />
                <Grid container justifyContent="center">

                    {
                        games.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((game, index) => (
                            <BrowserCard g={game} />
                        ))
                    }
                </Grid>

                <Grid container justifyContent="center">
                    <StyledPagination
                        count={noOfPages}
                        page={page}
                        onChange={handleChange}
                        showFirstButton
                        showLastButton
                        defaultPage={1} sx={{ mt: 1.5, mb: 1.5 }} align="center" variant="outlined" shape="rounded" />
                </Grid>

            </Fragment >
        </ThemeProvider>
    )
}