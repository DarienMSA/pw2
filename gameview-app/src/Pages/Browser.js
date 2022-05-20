import { useAuth0 } from '@auth0/auth0-react';
import { Accordion, AccordionDetails, AccordionSummary, alpha, Chip, Divider, Grid, Pagination, styled, ThemeProvider, Typography } from '@mui/material'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BrowserCard from '../Components/Browser/BrowserCard'
import btheme from '../Components/GameView-Theme';
import LoggedBar from '../Components/loggedBar';
import UnloggedBar from '../Components/unloggedBar';
import { GetCategories, GetOneCategory } from '../Services/CategoryServices';
import { GetGamesSortedBy, GetGamesByName, GetGamesByCategory } from '../Services/GameServices';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    const itemsPerPage = 6;
    const [page, setPage] = React.useState(1);
    const [noOfPages, setNoOfPages] = React.useState(1);
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const { isAuthenticated, isLoading } = useAuth0();
    const navigation = useNavigate();
    const [categories, setCategories] = useState([]);

    const navigationFunction = url => () => {
        navigation(url)
    };
    async function GetGamesSorted() {
        const data = await GetGamesSortedBy("name");
        setGames(data);
        setNoOfPages(Math.ceil(data.length / itemsPerPage));
        setSearchValue("Mostrándose todos los juegos:")
    }
    async function getCategories() {
        const data = await GetCategories();
        setCategories(data)
    }

    async function GetGamesName() {
        const data = await GetGamesByName(searchParams.get("v"));

        setGames(data);
        setNoOfPages(Math.ceil(data.length / itemsPerPage));
        setSearchValue(`Resultados de Búsqueda: ${searchParams.get("v")}`)

    }

    async function GetGamesCategory() {
        const data = await GetGamesByCategory(searchParams.get("c"));


        setGames(data);
        setNoOfPages(Math.ceil(data.length / itemsPerPage));
        const category = await GetOneCategory(searchParams.get("c"))
        setSearchValue(`Resultados de Búsqueda: ${category.name}`)


    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {

        if (!isLoading) {

            if (!isAuthenticated) {
                console.log(isAuthenticated)
                navigation("/")
            }

            getCategories()
            if (searchParams.has("v") && searchParams.has("c"))
                GetGamesSorted();
            else if (searchParams.has("v"))
                GetGamesName()
            else if (searchParams.has("c"))
                GetGamesCategory()
            else
                GetGamesSorted();

            setPage(1);
        }



    }, [searchParams.get("v"), isLoading, searchParams.get("c")]);

    //if (!Object.keys(games).length) return (<h1></h1>)
    if (isLoading) return (<h1></h1>)

    const navigateFunction = url => () => {
        navigate(url)
    };

    return (
        <ThemeProvider theme={btheme}>
            {isAuthenticated ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}

            <Fragment>

                <Grid container>
                    <Grid>

                        <Typography variant="h4" sx={{ mt: 2.5, ml: 25 }}>{searchValue}</Typography>


                    </Grid>
                </Grid>
                <Divider variant="inset" sx={{ mb: 1.5, mt: 1.5 }} />
                <Grid container item xs={12} justifyContent="center" alignItems={"center"}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Lista de géneros</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                categories.map((cat, index) => (
                                    <Chip m={5} key={index} onClick={navigateFunction("/browse?c=" + cat._id)} sx={{ minWidth: 0.15 }} label={cat.name} color="info" size="small" />
                                ))
                            }
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Divider variant="inset" sx={{ mb: 1.5, mt: 1.5 }} />
                <Grid container justifyContent="center">

                    {
                        games.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((game, index) => (
                            <BrowserCard key={index} g={game} />
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