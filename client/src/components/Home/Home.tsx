import React, { useState, useEffect } from "react";
import fetchInfo from "../../fetchInfo";
import styled from "styled-components";
import Posts from "./Posts";
import Options from "./Options";
const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;
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
      posts{
        id
        title
      }
    }
  }
          `;
};

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async (): Promise<void> => {
    const userQuery = await fetchInfo(getUserQuery, []);
    const { errors } = userQuery;

    if (errors) {
      const errorMessage: string = userQuery.errors[0].message;
      console.log(errorMessage);
      setErrors(errorMessage);
    } else {
      const {
        data: { user },
      } = userQuery;
      console.log(user);
      if (user) {
        const communityQuery = await fetchInfo(getCommunityQuery, [
          user.community,
        ]);
        if (communityQuery.errors) {
          console.log(communityQuery.errors[0].message);
          setErrors(communityQuery.errors[0].message);
        } else {
          console.log(communityQuery);
          setPosts(communityQuery.data.findCommunity.posts);
          setUserId(user.id);
        }
      }
    }
  };
  console.log(posts);
  console.log(userId);
  return (
    <div>
      {errors ? (
        <h1>{errors}</h1>
      ) : (
        <StyledDiv>
          {posts.length ? <Posts posts={posts} userId={userId}></Posts> : null}
          <Options></Options>
        </StyledDiv>
      )}
    </div>
  );
};

export default Home;
