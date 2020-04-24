import React from "react";
import Test from "./components/test";
import Registration from "./components/Registration";
import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>

      <Route
        exact
        path="/registration"
        render={(props) => <Registration {...props} />}
      />
    </div>
  );
}

export default App;
