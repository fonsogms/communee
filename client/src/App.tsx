import React from "react";
import Test from "./components/test";
import Registration from "./components/Registration/Registrations";
import Navbar from "./components/Navbar";
import Login from "./components/Login/Login";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
function App() {
  useEffect(
    () =>
      fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include",
      }).then((x) => {
        console.log(x);
      }),
    []
  );
  return (
    <div className="App">
      <Navbar></Navbar>

      <Route
        exact
        path="/registration"
        render={(props) => <Registration {...props} />}
      />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
    </div>
  );
}

export default App;
