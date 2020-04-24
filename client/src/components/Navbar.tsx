import React from "react";

const Navbar = (): any => {
  return (
    <div>
      <nav className="navBar">
        <div></div>
        <div className="button">
          <div>
            <h3>
              <button>
                {" "}
                <a href="/login">Login</a>
              </button>
            </h3>
          </div>
          <div>
            <h3>
              <button>
                {" "}
                <a href="/registration">Register</a>{" "}
              </button>
            </h3>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
