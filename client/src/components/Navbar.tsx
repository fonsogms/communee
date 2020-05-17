import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken, refreshToken } from "../Token";
import fetchInfo from "../fetchInfo";
const logOutMutation = (): string => {
  return `mutation {
logout
  


}`;
};
const Navbar = (props): any => {
  const handleLogout = async (): Promise<void> => {
    refreshToken("");
    await fetchInfo(logOutMutation, []);
    props.setLoggedIn(false);
  };
  return (
    <div>
      <nav className="navBar">
        <div></div>

        <div className="button">
          {props.loggedIn ? (
            <div>
              <h3>
                <button onClick={handleLogout}>
                  <Link to="/">Logout</Link>
                </button>
              </h3>
            </div>
          ) : (
            <>
              {" "}
              <div>
                <h3>
                  <button>
                    <Link to="/login">Login</Link>
                  </button>
                </h3>
              </div>
              <div>
                <h3>
                  <button>
                    <Link to="/registration">Register</Link>{" "}
                  </button>
                </h3>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
