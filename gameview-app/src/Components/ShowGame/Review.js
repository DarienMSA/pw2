import { Avatar, AvatarGroup, Box, Button, Divider, Grid, IconButton, Modal, Rating, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Comment from './Review/Comment';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GetUserEmail } from '../../Services/UserServices';
import { GetUserGameBadges } from '../../Services/BadgeServices';
import { CreateComment, GetCommentsByReview } from '../../Services/CommentServices';
import { AddUserLike, HasUserLike, RemoveUserLike } from '../../Services/ReviewServices';
import { CreateNotification } from '../../Services/NotificationServices';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 720,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "1%",
};

const ReviewGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        width: "80%"
    },
    [theme.breakpoints.up('md')]: {
        width: "70%"
    },
    [theme.breakpoints.up('lg')]: {
        width: "60%",
        marginRight: 230
    },

}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down('md')]: {
        width: 150, height: 150
    },
    [theme.breakpoints.up('md')]: {
        width: 150, height: 150,
        marginRight: 100
    },
    [theme.breakpoints.up('lg')]: {
        width: 150, height: 150
    },

}));

const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
    },
    [theme.breakpoints.up('md')]: {

        marginRight: 100
    },
    [theme.breakpoints.up('lg')]: {

    },

}));

export default function Review(props) {
    const navigate = useNavigate();

    const navigateFunction = url => () => {
        navigate(url);

    };

    const getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [likeButton, setLikeButton] = useState(<ThumbUpOffAltIcon />)
    const [hasLike, setHasLike] = useState(false);

    const [user, setUser] = useState({});
    const [badges, setBadges] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        "review": "",
        "comment": {
            "content": "",
            "date": "",
            "user": ""
        }
    })
    const [votes, setVotes] = useState(props.r.vote === undefined ? 0 : props.r.vote)

    async function getUserLike() {

        const data = await HasUserLike(props.r._id, props.actualUser._id);
        setHasLike(data.like)
        if (data.like)
            setLikeButton(<ThumbUpIcon />)
        else
            setLikeButton(<ThumbUpOffAltIcon />)
    }

    async function getUserGameBadges() {

        const data = await GetUserGameBadges(props.r.userId, props.r.gameId);
        if (data.gameId) {

            setBadges(data.badges);

        }
    }

    async function getUserByEmail() {
        const data = await GetUserEmail(props.r.userId);
        if (data.email) {
            setUser(data);
        }

    }

    async function getCommentsReview() {
        const data = await GetCommentsByReview(props.r._id);

        setComments(data);


    }
    useEffect(() => {
        getCommentsReview();
        getUserGameBadges();
        getUserByEmail();
        getUserLike();
    }, [hasLike]);

    if (!Object.keys(user).length) return (<h1></h1>)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setComment({
            ...comment,
            "comment": {
                [name]: value
            }
        })
    }

    const processComment = () => {

        async function createNotification() {
            const notification = {
                user: user._id,
                origin: "comment",
                fromUser: props.actualUser._id,
                fromGame: props.r.gameId,
                active: true,
                date: getCurrentDate()
            }
            const data = await CreateNotification(notification);
            console.log(data)

        }

        async function postComment() {
            const newComment = {
                "review": props.r._id,
                "comment": {
                    "content": comment.comment.content,
                    "date": getCurrentDate(),
                    "user": props.actualUser._id //antes estaba user._id, en teoría ese user es del q hizo la review, no del actual (quién escribió el comentario)
                }
            }
            const data = await CreateComment(newComment);
            if (data.review) {
                createNotification()
                setComment(data);
                getCommentsReview();
                setOpen2(false);
            }
        }
        postComment();

    }

    const onClickLike = () => {
        async function createNotification() {
            const notification = {
                user: user._id,
                origin: "like",
                fromUser: props.actualUser._id,
                fromGame: props.r.gameId,
                active: true,
                date: getCurrentDate()
            }
            const data = await CreateNotification(notification);
            console.log(data)

        }
        async function addLike() {
            const data = await AddUserLike(props.r._id, props.actualUser._id)
            setVotes(data.data.vote)
            setHasLike(true)
            createNotification()
        }
        async function removeLike() {
            const data = await RemoveUserLike(props.r._id, props.actualUser._id)
            setVotes(data.data.vote)
            console.log("remove: ", data)
            setHasLike(false)
        }
        if (hasLike) {
            removeLike();
        } else {
            addLike();
        }
    }

    return (
        <ReviewGrid container sx={{ borderRadius: 16 }} my={2} alignItems={"center"} justifyContent={"center"}>
            <Grid container item xs={12} md={2} alignItems={"center"} justifyContent={"center"}>
                <Box item>
                    <StyledAvatar onClick={navigateFunction("/account?u=" + user._id)} src={user.profilePic}></StyledAvatar>
                </Box>
                <StyledBox item width={"100%"} textAlign={"center"}>
                    <Typography variant={"caption"} component="legend" fontWeight={"bold"}> {props.r.score} </Typography>
                    <Rating precision={0.5} name="read-only" value={props.r.score} readOnly
                        emptyIcon={
                            <StarBorderIcon fontSize="inherit" />
                        } />
                </StyledBox>



            </Grid>
            <Grid item xs={12} md={8}>
                <Typography variant='h5' textAlign={"left"} mt={3} fontWeight={"bold"} style={{ fontFamily: 'Ubuntu' }}> {user.name} </Typography>
                {
                    props.r.date && (
                        <Typography mb={2} variant="caption" component={"h1"} > Fecha en el que terminó el juego: {props.r.date} </Typography>
                    )
                }

                <Divider sx={{ marginTop: "15px", marginBottom: "15px", background: "gray" }}> </Divider>
                <Typography variant="p" textAlign={"left"} mt={3}> {props.r.content} </Typography>

                <Grid item xs={12} container alignItems={"center"} justifyContent={"space-between"} mt={3}>
                    <AvatarGroup total={badges.length}>
                        {
                            badges.map((badge, index) => (
                                <Avatar key={badge._id} alt={badge.name} src={badge.image} />
                            ))
                        }

                    </AvatarGroup>
                    <Button onClick={handleOpen} sx={{ marginRight: 5, color: "#FFF2EF" }} color={"buttonPrimary"} variant="contained">Comentarios</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h4" component="h4">
                                Comentarios de la reseña
                            </Typography>
                            <Box
                                sx={{
                                    maxHeight: "720px",
                                    overflow: "auto",
                                    overflowX: "hidden",
                                    p: 1,
                                    mt: 2
                                }}>
                                {
                                    comments.map((comm, index) => (
                                        <Comment key={comm._id} c={comm} />
                                    ))
                                }


                            </Box>
                            <Button onClick={handleOpen2} sx={{ marginRight: 5, color: "#FFF2EF" }} color="buttonPrimary" variant="contained">Comentar</Button>
                            <Modal
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h5" component="h2">
                                        Comentar reseña del juego
                                    </Typography>
                                    <TextField fullWidth id="outlined-basic" multiline rows={2} onChange={handleOnChange} name="content" value={comment.comment.content} autoComplete='none' variant="outlined" sx={{ mt: 1.5, mb: 2 }} />
                                    <Grid container justifyContent="-moz-initial">
                                        <Grid sx={{
                                            display: "flex",
                                            flexDirection: 'row-reverse'
                                        }}>
                                            <Button color="buttonPrimary" sx={{ color: "#FFF2EF" }} onClick={processComment} variant="contained">Publicar</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>
                        </Box>
                    </Modal>
                </Grid>
                <Grid item xs={12} container alignItems={"start"} justifyContent={"start"} mt={1}>
                    {
                        props.actualUser.email !== user.email && (

                            <IconButton onClick={onClickLike} variant="p" color="buttonPrimary">{likeButton}</IconButton>


                        )

                    }
                    {
                        (votes !== 0) && (
                            <Typography variant='p' mt={1}>A {votes} personas les pareció útil esta reseña.</Typography>
                        )
                    }

                </Grid>


            </Grid>
        </ReviewGrid>
    )
}
