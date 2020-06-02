import React from "react";
import Events from "./components/events/Events";
import Test from "./components/test";
import AddEvent from "./components/AddEvent";
import AddPost from "./components/AddPost";
import Registration from "./components/Registration/Registrations";
import Navbar from "./components/Navbar";
import Login from "./components/Login/Login";
import "./App.css";
import { refreshToken } from "./Token";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "./components/Post/Post";
import Home from "./components/Home/Home";
import fetchInfo from "./fetchInfo";
import { refreshCommunityId } from "./communityInfo";
const getUserQuery = (): string => {
  return ` query{
        user{
          name
          community
          id
            
        
        }
      }`;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then(async (body) => {
        const data = await body.json();
        refreshToken(data.token);
        if (data.token) {
          const userQuery = await fetchInfo(getUserQuery, []);
          const { errors } = userQuery;

          if (errors) {
            const errorMessage: string = userQuery.errors[0].message;
            console.log(errorMessage);
          } else {
            const {
              data: { user },
            } = userQuery;
            console.log(user);
            if (user) {
              refreshCommunityId(user.community);
              setLoggedIn(true);
              setLoading(false);

              //should refactor this?
              // setUserId(user.id);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      {loading ? null : (
        <>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Navbar>
          <Route
            exact
            path="/registration"
            render={(props) => (
              <Registration setLoggedIn={setLoggedIn} {...props} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login setLoggedIn={setLoggedIn} {...props} />}
          />
          <Route exact path="/home" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/post/:id"
            render={(props) => <Post {...props} />}
          ></Route>
          <Route
            exact
            path="/add/post"
            render={(props) => <AddPost {...props}></AddPost>}
          ></Route>
          <Route
            exact
            path="/events"
            render={(props) => <Events {...props}></Events>}
          ></Route>
          <Route
            exact
            path="/event/add"
            render={(props) => {
              return <AddEvent {...props}></AddEvent>;
            }}
          ></Route>
        </>
      )}
    </div>
  );
}

export default App;
