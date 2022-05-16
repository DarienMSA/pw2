import { useAuth0 } from '@auth0/auth0-react';
import { Alert, Avatar, Button, Collapse, Divider, Grid, Modal, Paper, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UpdateComment } from '../../../Services/CommentServices';
import { GetUserEmail } from '../../../Services/UserServices';

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

export default function Comment(props) {
    const navigate = useNavigate();
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const { user, isLoading, isAuthenticated } = useAuth0();
    const [actualUser, setActualUser] = useState({});
    const [openAlertModif, setOpenAlertModif] = useState(false)

    const [isActualUserComment, setIsActualUserComment] = useState(false);
    const [comment, setComment] = useState({
        "_id": props.c._id,
        "review": props.c.review,
        "comment": {
            "content": props.c.comment[0].content,
            "date": props.c.comment[0].date,
            "user": props.c.comment[0].user
        }
    })
    const [modifComment, setModifComment] = useState({})

    const modifButton = <Grid container sx={{ display: "flex", flexDirection: 'row-reverse' }}>
        <Button onClick={handleOpen2} size="small" color="warning" variant="contained">Modificar</Button>
    </Grid >
    async function getUserByEmail() {
        const data = await GetUserEmail(user.email);
        if (data.email) {
            setActualUser(data);
        }

    }
    useEffect(() => {
        if (!isLoading) {
            if (comment.comment.user.email === user.email)
                setIsActualUserComment(true)
            getUserByEmail();
            setModifComment(comment)
        }

    }, [isLoading]);

    if (!Object.keys(modifComment).length) return (<h1></h1>)

    const navigateFunction = url => () => {
        navigate(url)
    };

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setModifComment({
            ...comment,
            "comment": {
                date: comment.comment.date,
                [name]: value,
                user: comment.comment.user
            }
        })
    }

    const putProcess = () => {
        async function updateComment() {
            const data = await UpdateComment(comment._id, modifComment);
            console.log(data)
            if (data.data.review) {
                setComment(modifComment)
            }
        }
        if (modifComment.comment.content.length === 0) {
            openAlertModif(true)
        } else {
            updateComment();
            setOpen2(false);
        }

    }

    return (
        <Paper elevation={5} sx={{ padding: 1, margin: 1 }}>
            <Grid container justifyContent="-moz-initial">
                <Grid sx={{ m: 1 }}>
                    <Avatar onClick={navigateFunction("/account?u=" + comment.comment.user._id)} sx={{ cursor: "pointer", bgcolor: blue[500] }} alt={comment.comment.user.name} src={comment.comment.user.profilePic}></Avatar>
                </Grid>
                <Grid xs={10}>
                    <Typography sx={{ ml: 1 }} id="modal-modal-title" variant="h6" component="h6" style={{ fontFamily: 'Ubuntu' }}>
                        {comment.comment.user.name}
                    </Typography>
                    <Typography sx={{ ml: 1.5 }} id="modal-modal-title" variant="caption" component="div">
                        {comment.comment.date}
                    </Typography>
                    <Divider variant="fullWidth" sx={{ mb: 1 }} />
                    <Typography sx={{ ml: 2, mb: 1.5 }} id="modal-modal-title" variant="body2" component="h6">
                        {comment.comment.content}
                    </Typography>

                </Grid>
                {
                    isActualUserComment ? modifButton : <h1></h1>
                }

                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Comentar reseña del juego
                        </Typography>
                        <TextField fullWidth id="outlined-basic" multiline rows={2} onChange={onChangeHandle} name="content" value={modifComment.comment.content} variant="outlined" sx={{ mt: 1.5, mb: 2 }} />
                        <Grid container justifyContent="-moz-initial">
                            <Grid container item xs={12} sx={{
                                display: "flex",
                                flexDirection: 'row-reverse'
                            }}>
                                <Button color="error" sx={{ color: "#FFF2EF", marginLeft: 10, display: "none" }} variant="contained">Eliminar</Button>
                                <Button color="buttonPrimary" sx={{ color: "#FFF2EF" }} onClick={putProcess} variant="contained">Actualizar</Button>

                            </Grid>
                            <Grid item xs={12}>
                                <Collapse in={openAlertModif}>
                                    <Alert id="alert-modif" variant="filled" severity="warning" sx={{ mt: 2 }}> Necesitas escribir algo. </Alert>
                                </Collapse>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </Grid>
        </Paper>
    )
}
