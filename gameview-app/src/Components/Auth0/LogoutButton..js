import { IconButton, MenuItem, Typography } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <MenuItem onClick={logout}>
            <Typography textAlign="center">Cerrar sesión</Typography>
        </MenuItem>
    )
}

export const LoginMenuItem = () => {
    const { logout } = useAuth0();
    return (
        <MenuItem onClick={logout}>
            <IconButton
                size="large"
                color="inherit"
            >
                <LogoutIcon />
            </IconButton>
            <p>Cerrar sesión</p>
        </MenuItem>
    )
}