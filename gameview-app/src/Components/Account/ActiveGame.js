import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Divider, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ActiveGame() {
    return (
        <Card elevation={10} sx={{ maxWidth: 345, margin: "10px", borderRadius: 5 }} >
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png"
            />
            <CardContent>
                <Divider variant="middle"> <Chip label="ELDEN RING" /> </Divider>
            </CardContent>
            <CardActions >
                <Box textAlign='center' minWidth={"100%"}>

                    <IconButton color="error" aria-label="Quitar juego activo" component="span">
                        <DeleteForeverIcon />
                    </IconButton>

                </Box>


            </CardActions>
        </Card>
    )
}
