import React from "react";
import { Link } from "react-router-dom";
const Options = (props) => {
  return (
    <div>
      <div>
        <button>
          <Link to="/events">Events</Link>
        </button>
      </div>
      <div>
        <button>
          <Link to="/givings">givings</Link>
        </button>
      </div>
    </div>
  );
};

export default Options;
