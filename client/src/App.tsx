import React from "react";
import Test from "./components/test";
import Registration from "./components/Registration/Registrations";
import Navbar from "./components/Navbar";
import Login from "./components/Login/Login";
import "./App.css";
import { refreshToken } from "./Token";
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
function App() {
  useEffect(() =>
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then(async (body: any) => {
        const data = await body.json();
        console.log(data);
        if (data.token) {
          refreshToken(data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      })
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
