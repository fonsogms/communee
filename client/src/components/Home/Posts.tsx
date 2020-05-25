import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const StyledPosts = styled.div`
  overflow: scroll;
  width: 50vh;
  height: 40vh;
`;
const Posts = (props) => {
  return (
    <StyledPosts>
      {props.posts.map((elem) => {
        return (
          <>
            <h3>
              <Link to={`/post/${elem.id}`}>{elem.title}</Link>
            </h3>
          </>
        );
      })}
    </StyledPosts>
  );
};

export default Posts;
