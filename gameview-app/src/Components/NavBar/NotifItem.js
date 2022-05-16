import { Avatar, Grid, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import logoImage from '../../Assets/logo_gameview.png';
import React, { useEffect, useState } from 'react'
import CelebrationIcon from '@mui/icons-material/Celebration';
import ForumIcon from '@mui/icons-material/Forum';
export default function NotifItem(props) {
  const [notifItem, setNotifItem] = useState({})

  const structureNotification = () => {
    switch (props.notif.origin) {
      case "comment":
        setNotifItem({
          image: props.notif.fromUser.profilePic,
          title: `¡Han comentado tu reseña!`,
          description: `${props.notif.fromUser.name} ha comentado tu reseña de ${props.notif.fromGame.name}.`,
          date: props.notif.date,
          icon: <ForumIcon sx={{ width: "15px", height: "15px" }} />
        })
        break;
      case "like":
        setNotifItem({
          image: props.notif.fromUser.profilePic,
          title: `¡Tu reseña la han encontrado útil!`,
          description: `${props.notif.fromUser.name} le ha gustado tu reseña de ${props.notif.fromGame.name}.`,
          date: props.notif.date,
          icon: <ThumbUpIcon sx={{ width: "15px", height: "15px" }} />
        })
        break;
      case "welcome":
        setNotifItem({
          image: logoImage,
          title: `¡Bienvenido a GameView!`,
          description: "",
          date: props.notif.date,
          icon: <CelebrationIcon sx={{ width: "15px", height: "15px" }} />
        })
        break;
      default:
        console.log("default")
        return false;
    }
  }

  useEffect(() => {

    structureNotification();
  }, []);

  if (!Object.keys(notifItem).length) return (<h1></h1>)


  return (
    <Grid container maxWidth={400} direction="row"
    >

      <Grid item container xs={2} textAlign="center"
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Avatar src={notifItem.image} />
      </Grid>

      <Grid item container xs={10}
        direction="row"
        justifyContent="center"
        alignItems="center">

        <Typography fontWeight={"bold"} variant="p" gutterBottom noWrap> {notifItem.title} </Typography>
        <Typography variant="caption" noWrap>  {notifItem.description}  </Typography>
        <Typography variant="caption" noWrap> {notifItem.icon}  {notifItem.date} </Typography>
      </Grid>

    </Grid>
  )
}

