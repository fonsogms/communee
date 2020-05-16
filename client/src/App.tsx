import React from "react";
import Test from "./components/test";
import Registration from "./components/Registration/Registrations";
import Navbar from "./components/Navbar";
import Login from "./components/Login/Login";
import "./App.css";
import { refreshToken } from "./Token";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(
    () =>
      fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include",
      })
        .then(async (body) => {
          const data = await body.json();
          refreshToken(data.token);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        }),

    []
  );
  return (
    <div className="App">
      {loading ? null : (
        <>
          <Navbar></Navbar>

          <Route
            exact
            path="/registration"
            render={(props) => <Registration {...props} />}
          />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route exact path="/home" render={(props) => <Home {...props} />} />
        </>
      )}
    </div>
  );
}

export default App;
