import React from "react";
import { useState } from "react";
import Mapbox from "./Mapbox";
import fetchInfo from "../fetchInfo";
const createUserMutation = (
  name: string,
  email: string,
  password: string,
  profilePic: string,
  community: string
): string => {
  return `
     mutation {
         createUser(userInput:
            {
                name: "${name}",
                email: "${email}",

                password: "${password}",
                profilePic: "${profilePic}",
                community:"${community}"
                
            }){
             name
             community
             email

             
         }
     }
    `;
};

const createCommunityMutation = (address: string): string => {
  return `
mutation{
  createCommunity(userInput:{
     name:"Change the community name",
    address:"${address}"
  })
  {
    
    id
    
  }
  
  
}
`;
};

const Registration = () => {
  const [userInfo, setUser] = useState({
    name: " ",
    email: " ",

    password: " ",
    profilePic: " ",
  });

  const [address, setAddressInput] = useState("");
  console.log(Object.values(userInfo!));
  const handleSubmit = async (e) => {
    e.preventDefault();
    let values: Array<string> = Object.values(userInfo!);

    const {
      createCommunity: { id },
    } = await fetchInfo(createCommunityMutation, [address]);
    values.push(id);
    const data: Promise<any> = await fetchInfo(createUserMutation, [...values]);
    console.log(data);
    /*  const body = await fetch(`http://localhost:4000/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // @ts-ignore
        query: createUserMutation(...values),
      }),
    });
    const { data } = await body.json();
    console.log(data); */
  };
  const changeInput = (input: string, newValue: string): void => {
    setUser({ ...userInfo, [input]: newValue });
  };

  return (
    <div>
      <form className="registration" onSubmit={handleSubmit}>
        <div className="input">
          <div className="userInfo">
            {Object.keys(userInfo).map((elem) => {
              return (
                <React.Fragment>
                  <div key={elem}>
                    <div>
                      <label htmlFor="">
                        {elem[0].toLocaleUpperCase() + elem.slice(1)}
                      </label>
                    </div>
                    <div>
                      <input
                        type={elem === "password" ? "password" : "text"}
                        onChange={(e) => changeInput(elem, e.target.value)}
                        name={elem}
                        value={userInfo[elem]}
                      />
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <Mapbox setAddressInput={setAddressInput}></Mapbox>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Registration;
