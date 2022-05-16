import { Button, IconButton, MenuItem } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';

import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    const logInProcess = () => {
        loginWithRedirect()
    }

    return (
        <Button onClick={logInProcess} sx={{ marginLeft: "auto" }} color="inherit" endIcon={<LoginIcon />}>
            INICIAR SESIÓN{" "}
        </Button>
    )
}

export const LoginMenuItem = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <MenuItem onClick={loginWithRedirect}>
            <IconButton size="large" color="inherit">
                <LoginIcon />
            </IconButton>
            <p>Iniciar sesión</p>
        </MenuItem>
    )
}

