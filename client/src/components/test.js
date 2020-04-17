import React, { Component } from "react";
const getChatsQuery = `
  {
     user{
         name
     }
 }
`;
export default class test extends Component {
  async getInfo() {
    const body = await fetch(`http://localhost:4000/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: getChatsQuery }),
    });
    console.log(await body.json());
  }
  render() {
    this.getInfo();
    console.log("hello");
    return <div></div>;
  }
}
