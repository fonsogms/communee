import React from "react";
import { Link } from "react-router-dom";
const Navbar = (): any => {
  return (
    <div>
      <nav className="navBar">
        <div></div>
        <div className="button">
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
