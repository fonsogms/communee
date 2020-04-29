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
              profilePic
             
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
  const [image, setImage] = useState("");
  const [address, setAddressInput] = useState("");
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "communee");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgktrtxjv/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file.secure_url);
    setImage(file.secure_Url);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let values: Array<string> = Object.values(userInfo!);

    const {
      createCommunity: { id },
    } = await fetchInfo(createCommunityMutation, [address]);
    values.push(id);
    const data: Promise<any> = await fetchInfo(createUserMutation, [...values]);
    console.log(data);
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
            <div>
              <label htmlFor="">Profile Image</label>
              <input type="file" onChange={uploadImage} />
            </div>
          </div>
          <Mapbox setAddressInput={setAddressInput}></Mapbox>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Registration;
