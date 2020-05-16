import React from "react";
import fetchInfo from "../fetchInfo";
const getUserQuery = (): string => {
  return ` query{
        user{
          name
          community
          id
            
        
        }
      }`;
};
const getCommunityQuery = (id): string => {
  return `query{
    findCommunity(id:"${id}"){
      address
    }
  }
          `;
};
const Home = (props) => {
  const getData = async (): Promise<void> => {
    const userQuery = await fetchInfo(getUserQuery, []);
    const {
      data: { user },
    } = userQuery;
    console.log(user);
    if (user) {
      const communityQuery = await fetchInfo(getCommunityQuery, [
        user.community,
      ]);
      console.log(communityQuery);
    }
    console.log(user);
  };
  getData();
  return <div>Hello</div>;
};

export default Home;
