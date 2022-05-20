import { Divider, Grid, styled, alpha, InputBase, Autocomplete, TextField, IconButton, ThemeProvider } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import ToMessage from '../Components/Chat/ToMessage';
import SendIcon from '@mui/icons-material/Send';
import UserPreview from '../Components/Chat/UserPreview'
import FromMessage from '../Components/Chat/FromMessage';
import btheme from '../Components/GameView-Theme';
import { useLocation, useNavigate } from 'react-router-dom';
import LoggedBar from '../Components/loggedBar';
import UnloggedBar from '../Components/unloggedBar';
import { useAuth0 } from '@auth0/auth0-react';
import { GetAllExcept, GetUserEmail } from '../Services/UserServices';
import { AddMessage, CreateChat, CreateChatLog, GetChatLog, GetUserChats, GetUsersChats, SetSeenChat } from '../Services/ChatServices';
import DisplayMessage from '../Components/Chat/SendMessaje';

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
    const { search } = useLocation();
    const searchParams = new URLSearchParams((search));
    const { user, isLoading, isAuthenticated } = useAuth0();
    const [actualUser, setActualUser] = useState({});
    const [chats, setChats] = useState([]);
    const [allUsers, setAllUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [counter, setCounter] = useState(0)

    const navigate = useNavigate();

    const objectComparisonCallback = (arrayItemA, arrayItemB) => {
        if (arrayItemA._id < arrayItemB._id) {
            return 1
        }

        if (arrayItemA._id > arrayItemB._id) {
            return -1
        }

        return 0
    }

    async function setChatSeen() {
        const data = await SetSeenChat(searchParams.get("c"), true)
        console.log("data: ", data)
        if (data.data.lastMessageFrom.email === user.email) {
            const data2 = await SetSeenChat(searchParams.get("c"), false)
            console.log("data2: ", data2);
        }

    }

    async function getUsersChatLog() {
        const data = await GetChatLog(searchParams.get("c"))
        if (data._id) {
            data.message.sort(objectComparisonCallback)
            setMessages([]);
            setMessages(data.message);
        }
        else
            setMessages([])
    }
    async function getAllChats(id) {
        const data = await GetUserChats(id);
        setChats(data);
        if (searchParams.has("c"))
            getUsersChatLog();
    }

    async function getAllUsers(id) {
        const data = await GetAllExcept(id);
        setAllUsers(data);
        getAllChats(id)
    }

    async function getActualUser() {
        const data = await GetUserEmail(user.email)
        setActualUser(data);
        getAllUsers(data._id);

    }


    const getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today
    }


    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                navigate("/")
            }
            if (searchParams.has("c"))
                setChatSeen();
            getActualUser();
        }
    }, [isLoading, searchParams.get("c"), counter])

    if (!Object.keys(allUsers).length && !Object.keys(chats).length && !Object.keys(messages).length) return (<h1></h1>)


    const acOnChange = (e, obj) => {
        if (obj !== null) {

            async function createUsersChat(chat) {
                const data = await CreateChat(chat)
                if (data._id) {
                    navigate(`/chat?c=${data._id}&u=${searchParams.get("u")}`)
                }
            }
            async function getUsersChat() {
                const data = await GetUsersChats(actualUser._id, obj._id);

                if (data._id) {
                    navigate(`/chat?c=${data._id}&u=${searchParams.get("u")}`)
                } else {
                    const newChat = {
                        members: [
                            actualUser._id,
                            obj._id
                        ],
                        lastMessageDate: getCurrentDate() + " " + new Date().toLocaleTimeString("en-US"),
                        lastMessage: "",
                        lastMessageFrom: actualUser._id,
                        seen: true
                    }
                    createUsersChat(newChat)

                }
            }
            getUsersChat();

        }

    }

    const sendMessage = () => {
        let input = document.getElementById("input-message")
        if (input.value && searchParams.has("c")) {
            const newMessage = {
                "chat": searchParams.get("c"),
                "message": {
                    "content": input.value,
                    "from": actualUser._id,
                    "to": searchParams.get("u"),
                    "messageDate": getCurrentDate() + " " + new Date().toLocaleTimeString("en-US")
                }
            }

            async function SearchChatLog() {
                const data = await GetChatLog(searchParams.get("c"))
                if (data._id) {
                    const updatedData = await AddMessage(newMessage, searchParams.get("c"))


                } else {
                    const createdData = await CreateChatLog(newMessage)

                }
            }
            SearchChatLog();
            setCounter((c) => c + 1);
            input.value = ""

        }

    }

    return (
        <ThemeProvider theme={btheme}>
            {isAuthenticated ? <LoggedBar></LoggedBar> : <UnloggedBar></UnloggedBar>}
            <Fragment>

                <Grid container maxHeight="93vh">

                    <Grid item xs={12} md={3} backgroundColor="#1A374D" style={{ overflow: "auto", overflowX: "hidden", maxHeight: "93vh" }}>
                        <StyledAutocomplete
                            id="combo-box-demo"
                            key={(allUsers) => allUsers._id}
                            getOptionLabel={(allUsers) => `${allUsers.name} | ${allUsers.email} `}
                            options={allUsers}
                            onChange={acOnChange}
                            renderInput={(params) => <TextField {...params} label="Buscar usuarios..." />}

                        />
                        {
                            chats.map((chat, index) => (
                                <UserPreview key={index} c={chat} actualUser={actualUser}></UserPreview>
                            ))
                        }



                    </Grid>
                    <Grid container xs={12} md={9} style={{ maxHeight: "93vh", background: "#E3EAEE" }}>
                        <Grid item xs={12} style={{
                            height: "86vh", borderStyle: 'solid',
                            borderWidth: "5px",
                            borderColor: "#1A374D", overflow: "auto", overflowX: "hidden", display: "flex",
                            flexDirection: "column-reverse"
                        }} >
                            {searchParams.has("c") && (
                                <>
                                    {
                                        messages.map((msg, index) => (
                                            <DisplayMessage key={index} msg={msg}></DisplayMessage>
                                        ))
                                    }
                                </>
                            )}




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
                                <StyledTextField id="input-message" label="Escribe un mensaje..." variant="filled" />
                            </Grid>
                            <Grid xs={1} textAlign="center">
                                <IconButton color="from_message" onClick={sendMessage} component="span">
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Fragment >
        </ThemeProvider>
    )
}
