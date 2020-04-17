import React, { Component } from "react";
import { useState } from "react";
let getChatsQuery = (name, email) => {
  return `
   mutation {
       user(name:"${name}",email:"${email}"){
           name
       }
   }
  `;
};

export default class test extends Component {
  state = {
    name: "",
    email: "",
    data: [],
  };
  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  getInfo = async () => {
    const body = await fetch(`http://localhost:4000/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getChatsQuery(this.state.name, this.state.email),
      }),
    });
    const { data } = await body.json();
    this.setState({
      data,
    });
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
        <button onClick={this.getInfo}>Press it bro</button>

        {this.state.data.user ? (
          <>
            <h1>{this.state.data.user.name}</h1>
            <h1>{this.state.data.user.email}</h1>
          </>
        ) : null}
      </div>
    );
  }
}
