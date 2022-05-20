import { Grid, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import btheme from '../Components/GameView-Theme'
import Gamecollection from '../Components/Home/GameCollection'
import { useNavigate } from "react-router-dom"
import LoggedBar from '../Components/loggedBar'
import UnloggedBar from '../Components/unloggedBar'
import { GetGamesSortedBy } from '../Services/GameServices'
import logoImage from '../Assets/logo_gameview.png';
import { useAuth0 } from "@auth0/auth0-react";
import { CreateUser, GetUserEmail } from '../Services/UserServices'
import { CreateNotification } from '../Services/NotificationServices'

export default function Home() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userDB, setUserDB] = useState({})

    const getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today
    }

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            async function createNotification(newUser) {
                const notification = {
                    user: newUser._id,
                    origin: "welcome",
                    active: true,
                    date: getCurrentDate()
                }
                const data = await CreateNotification(notification);
                console.log(data)

            }

            async function getUserByEmail() {
                const data = await GetUserEmail(user.email);
                if (data._id) {

                    user._id = data._id

                    setUserDB(data);
                } else {
                    let newUser = {
                        email: user.email,
                        name: user.nickname.substring(0, 30),
                        profilePic: user.picture,
                        birthday: "",
                        desc: "",
                        social: {
                            twitter: "",
                            discord: "",
                            instagram: "",
                            facebook: ""
                        }
                    };
                    async function UserPost() {
                        const data = await CreateUser(newUser);
                        user._id = data._id
                        if (data.email) {
                            setUserDB(data);
                            createNotification(data);
                        } else {
                        }
                    }
                    UserPost()
                }

            }
            getUserByEmail();
        }
    }, [isLoading]);



    return (
        <ThemeProvider theme={btheme}>
            {isAuthenticated ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
            <Grid>
                <Grid sx={{ mt: 3, mb: 3 }} container alignItems="center" justifyContent="center">
                    <img width={380} src={logoImage}></img>
                </Grid>
                <Grid sx={{ mt: 3, mb: 3 }} container alignItems="center" justifyContent="center" textAlign={"center"}>
                    <Typography fontWeight={"bold"} variant="h4" component="h4" fontFamily={"Ubuntu"}>
                        Explora, reseña, puntúa y encuentra nuevos jugadores
                    </Typography>
                </Grid>
                <Gamecollection sortBy="activeUsersLength" header="Con más jugadores buscando..." alignText="left" />
                <Gamecollection sortBy="score" header="Mejor Puntuados" alignText="center" />
                <Gamecollection sortBy="reviewsLength" header="Más Reseñados" alignText="right" />
            </Grid>
        </ThemeProvider>
    )
}
