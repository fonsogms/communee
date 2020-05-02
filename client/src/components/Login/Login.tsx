import React, { useState } from "react";
import fetchInfo from "../../fetchInfo";

const getUserQuery = (email, password) => {
  return `
    mutation{
        login(email:"${email}",password:"${password}"){
          name
          community
          profilePic
        }
      }`;
};

const Login = (props) => {
  interface values {
    email: string;
    password: string;
  }
  let values: values = {
    email: "",
    password: "",
  };
  const [userInput, setUserInput] = useState(values);
  const [error, setError] = useState("");
  const handleChange = (e: any): void => {
    const value: string = e.target.value;
    const name: string = e.target.name;
    setUserInput({ ...userInput, [name]: value });
  };
  const handleLogin = async () => {
    const data = await fetchInfo(getUserQuery, [...Object.values(userInput)]);
    const { errors } = data;
    console.log(errors);
    if (errors) {
      const errorMessage: string = data.errors[0].message;
      console.log(data.errors[0].message);
      setError(errorMessage);
      setUserInput(values);
    } else {
      console.log(data.data.login);
    }
  };

  console.log(userInput);
  console.log(error);
  return (
    <div className="login">
      {" "}
      <div>
        <label htmlFor="">e-mail</label>
        <input
          type="text"
          name="email"
          value={userInput.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="">password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={userInput.password}
        />
      </div>
      <div>
        <button onClick={handleLogin}>Submit</button>
      </div>
      {error ? <h1>{error}</h1> : null}
    </div>
  );
};

export default Login;
