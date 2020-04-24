import React from "react";
import { useState } from "react";

let getChatsQuery = (
  name: string,
  email: string,
  address: string,
  password: string,
  profilePic: string
): string => {
  return `
     mutation {
         createUser(userInput:
            {
                name: "${name}",
                email: "${email}",
                address:"${address}",

                password: "${password}",
                profilePic: "${profilePic}",
                
            }){
             name
         }
     }
    `;
};
const Registration = () => {
  const [userInfo, setUser] = useState({
    name: " ",
    email: " ",
    address: " ",

    password: " ",
    profile: " ",
  });
  console.log(Object.values(userInfo!));
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    let values: Array<string> = Object.values(userInfo!);
    console.log(values.length);
    console.log(...values);
    const body = await fetch(`http://localhost:4000/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // @ts-ignore
        query: getChatsQuery(...values),
      }),
    });
    const { data } = await body.json();
    console.log(data);
  };
  const changeInput = (input: string, newValue: string): void => {
    setUser({ ...userInfo, [input]: newValue });
  };

  return (
    <div>
      Hello
      <form onSubmit={handleSubmit}>
        {Object.keys(userInfo).map((elem) => {
          return (
            <React.Fragment>
              <div key={elem}>
                <label htmlFor="">{elem} </label>
                <input
                  type="text"
                  onChange={(e) => changeInput(elem, e.target.value)}
                  name={elem}
                  value={userInfo[elem]}
                />
              </div>
            </React.Fragment>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Registration;
