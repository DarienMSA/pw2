import UnloggedBar from "./Components/unloggedBar";
import LoggedBar from "./Components/loggedBar";
import { Fragment } from "react";
import Chat from "./Pages/Chat";
import Account from "./Pages/Account";
import UpdateAccount from "./Pages/UpdateAccount";
import ShowGame from "./Pages/ShowGame";
import Home from "./Pages/Home";
import Browser from "./Pages/Browser";
import { ThemeProvider } from "@mui/material";
import btheme from "./Components/GameView-Theme";
import LogInScreen from "./Pages/LogIn";
import SignInScreen from "./Pages/SignIn";
import "./App.css"

function App() {
  return (
    <Fragment>
      <ThemeProvider theme={btheme}>
        <LoggedBar></LoggedBar>
        <Chat></Chat>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
