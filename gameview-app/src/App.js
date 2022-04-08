import UnloggedBar from "./Components/unloggedBar";
import LoggedBar from "./Components/loggedBar";
import { Fragment } from "react";
import Chat from "./Pages/Chat";
import Account from "./Pages/Account";
import UpdateAccount from "./Pages/UpdateAccount";
import ShowGame from "./Pages/ShowGame";
import Home from "./Pages/Home";
import Browser from "./Pages/Browser";
import LogInScreen from "./Pages/LogIn";
import SignInScreen from "./Pages/SignIn";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css"

function App() {

  return (
    <Fragment>

      <LoggedBar></LoggedBar>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/browse" element={<Browser />} />
        <Route exact path="/browse/:idGame" element={<ShowGame />} />
        <Route exact path="/signin" element={<SignInScreen />} />
        <Route exact path="/login" element={<LogInScreen />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/account/update" element={<UpdateAccount />} />
      </Routes>

    </Fragment>
  );
}

export default App;

// Path: "/" Lleva al inicio
// Path: "/browse" Lleva al buscador, recibe como parámetro "v" que representa lo que se escribió en el buscador. En caso de no escribir nada mostrará todos los juegos
// Path: "/browse/:idGame" Lleva a los detalles de un juego.
// Path: "/signin" Lleva a la pantalla de registrarse.
// Path: "/login" Lleva a la pantalla de iniciar sesión.
// Path: "/chat" Lleva al chat, recibe un parámetro "c" que representa el id del chat. En caso de que no haya parámetro, se muestra vacío el historial del chat.
// Path: "/account" Lleva a la cuenta, recibe un parámetro "u" que representa el id de un usuario. En caso de que no haya parámetro, será el perfil del usuario actual.
// Path: "/account/update" Lleva a la configuración de la cuenta del usuario.


