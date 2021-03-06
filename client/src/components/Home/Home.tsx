import React, { useState, useEffect } from "react";
import fetchInfo from "../../fetchInfo";
import styled from "styled-components";
import Posts from "./Posts";
import { Link } from "react-router-dom";
import Options from "./Options";
import { refreshCommunityId } from "../../communityInfo";
import { refreshUserId, getUserId } from "../../userInfo";

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
        creator
      }
    }
  }
          `;
};

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState("");
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
        refreshUserId(user.id);
        const communityQuery = await fetchInfo(getCommunityQuery, [
          user.community,
        ]);

        if (communityQuery.errors) {
          console.log(communityQuery.errors[0].message);
          setErrors(communityQuery.errors[0].message);
        } else {
          refreshCommunityId(user.community);
          console.log(communityQuery);
          setPosts(communityQuery.data.findCommunity.posts);
          //should refactor this?
          // setUserId(user.id);
        }
      }
    }
  };

  return (
    <div>
      {errors ? (
        <h1>{errors}</h1>
      ) : (
        <StyledDiv>
          <div>
            {posts.length ? (
              <Posts
                posts={posts}
                setPosts={setPosts}
                userId={getUserId()}
              ></Posts>
            ) : null}
            <div>
              <button>
                <Link to={{ pathname: "/add/post" }}> Add Post</Link>
              </button>
            </div>
          </div>

          <Options></Options>
        </StyledDiv>
      )}
    </div>
  );
};

export default Home;
