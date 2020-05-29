import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import fetchInfo from "../../fetchInfo";
import { getCommunityId } from "../../communityInfo";
const StyledPosts = styled.div`
  overflow: scroll;
  width: 100vh;
  height: 40vh;
  border-style: solid;
`;
const deletePostMutation = (id: string, communityId: string): string => {
  return `mutation{
    deletePost(id:"${id}",communityId:"${communityId}"){
      title
    }
  }`;
};
const Posts = (props) => {
  const deletePost = async (id): Promise<void> => {
    const response = await fetchInfo(deletePostMutation, [
      id,
      getCommunityId(),
    ]);
    const { errors } = response;
    if (errors) {
      const errorMessage: string = response.errors[0].message;
      console.log(errorMessage);
    } else {
      let filteredPosts = props.posts.filter((elem) => {
        return elem.id !== id;
      });
      props.setPosts(filteredPosts);
    }
  };
  return (
    <StyledPosts>
      {props.posts.map((elem) => {
        return (
          <div key={elem.id}>
            <h3>
              <Link
                to={{
                  pathname: `/post/${elem.id}`,
                }}
              >
                {elem.title}
              </Link>
            </h3>
            {elem.creator == props.userId ? (
              <button onClick={() => deletePost(elem.id)}>Delete</button>
            ) : null}
          </div>
        );
      })}
    </StyledPosts>
  );
};

export default Posts;
