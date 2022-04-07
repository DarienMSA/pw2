import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Stack } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const navigate = useNavigate();

    const navigateFunction = url => () => {
        let v = document.getElementById("browseValue");
        if (v.value != "") {
            navigate(url + "?v=" + v.value);
        } else {
            navigate(url);
        }


    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha("#FFF2EF", 0.15), //white_gv
        '&:hover': {
            backgroundColor: alpha("#FFF2EF", 0.25), //white_gv
        },
        "& .MuiInputBase-input": {
            color: "#FFF2EF" //white_gv
        },
        marginRight: theme.spacing(2),
        marginLeft: '0',
        flexGrow: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        }
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));



    return (
        <Stack direction="row" alignItems="center">
            <Search>
                <SearchIconWrapper>
                    <SportsEsportsIcon color={"white_gv"} />
                </SearchIconWrapper>
                <StyledInputBase
                    id="browseValue"
                    placeholder="Buscar videojuego..."
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <Button onClick={navigateFunction("/browse")} variant="contained" color="buttonPrimary">
                <SearchIcon color={"white_gv"} />
            </Button>
        </Stack>
    )
}
