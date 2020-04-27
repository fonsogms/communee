import React, { Component } from "react";
import { useState } from "react";
let getChatsQuery = (name: string, email: string): string => {
  return `
   mutation {
       user(name:"${name}",email:"${email}"){
           name
       }
   }
  `;
};

const Test = (props) => {
  console.log(props);
  interface textInput {
    target: {
      name: string;
      value: string;
    };
  }

  const [input, setInput] = useState({
    name: "",
    email: "",
    data: {
      user: {
        name: "",
        email: "",
      },
    },
  });
  const changeValue = ({ target: { name, value } }: textInput): void => {
    setInput({ ...input, [name]: value });
  };
  const getInfo = async (): Promise<void> => {
    const body = await fetch(`http://localhost:4000/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getChatsQuery(input.name, input.email),
      }),
    });
    const { data: object } = await body.json();
    setInput({ ...input, data: object });
  };
  return (
    <React.Fragment>
      <input
        type="text"
        name="name"
        onChange={changeValue}
        value={input.name}
      />
      <input
        type="text"
        name="email"
        onChange={changeValue}
        value={input.email}
      />
      <button onClick={getInfo}>Press it bro</button>

      {input.data.user && (
        <div>
          <h1>{input.data.user.name}</h1>
          <h1>{input.data.user.email}</h1>
        </div>
      )}
    </React.Fragment>
  );
};

export default Test;
