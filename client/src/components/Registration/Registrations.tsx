import React, { useState, useEffect } from "react";
import Map from "./Map";
import Mapbox from "./Mapbox";
import ProfileForm from "./ProfileForm";
import fetchInfo from "../../fetchInfo";
import { getToken } from "../../Token";
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

const Registration = (props) => {
  console.log("this is the token", getToken());

  const [showMap, setShowMap] = useState(true);
  const [userInfo, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const handleSubmit = async (e) => {
    let values: Array<string> = Object.values(userInfo!);

    const communityResponse: Promise<any> = await fetchInfo(
      createCommunityMutation,
      [address]
    );
    // @ts-ignore
    const id: string = communityResponse.data.createCommunity.id;

    values.push(image);
    values.push(id);
    const data: Promise<any> = await fetchInfo(createUserMutation, [...values]);
    console.log(data);
    props.history.push("/home");
  };
  console.log("this is the show map?", showMap);
  return (
    <>
      <h2 className="title">Find your community and start sharing with them</h2>
      {showMap ? (
        <Mapbox
          setAddress={setAddress}
          setShowMap={setShowMap}
          address={address}
        ></Mapbox>
      ) : (
        <ProfileForm
          setUser={setUser}
          userInfo={userInfo}
          setImage={setImage}
          image={image}
          setShowMap={setShowMap}
          handleSubmit={handleSubmit}
        ></ProfileForm>
      )}
    </>
  );
};

export default Registration;
