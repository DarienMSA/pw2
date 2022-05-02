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




      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/browse" element={<Browser />} />
        <Route exact path="/browse/game" element={<ShowGame />} />
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




