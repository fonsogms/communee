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

const Test = () => {
  interface textInput {
    target: {
      name: string;
      value: string;
    };
  }

  const [input, setInput] = useState({ name: "", email: "", data: {} });
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
  console.log(input);
  return (
    <div>
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
        <React.Fragment>
          <h1>{input.data.user.name}</h1>
          <h1>{input.data.user.email}</h1>
        </React.Fragment>
      )}
    </div>
  );
};

export default Test;

/* export default class test extends Component {
  state = {
  
  };
  
  render() {
    console.log(this.state);
    console.log("hello");
    return (
      <div>
        <input
          type="text"
          name="name"
          onChange={this.changeValue}
          value={this.state.name}
        />
        <input
          type="text"
          name="email"
          onChange={this.changeValue}
          value={this.state.email}
        />
      
      </div>
    );
  }
}
 */
