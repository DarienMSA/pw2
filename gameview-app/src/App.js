import UnloggedBar from "./Components/unloggedBar";
import LoggedBar from "./Components/loggedBar";
import { Fragment } from "react";
import Chat from "./Pages/Chat";
import Account from "./Pages/Account";
import UpdateAccount from "./Pages/UpdateAccount";
import ShowGame from "./Pages/ShowGame";

function App() {
  return (
    <Fragment>
      <LoggedBar></LoggedBar>
      <Account></Account>
    </Fragment>
  );
}

export default App;
