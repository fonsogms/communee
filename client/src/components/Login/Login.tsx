import React from "react";

const Login = () => {
  return (
    <div className="login">
      <div>
        <label htmlFor="">e-mail</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">password</label>
        <input type="password" />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default Login;
