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
          <div key={elem.id}>
            <h3>
              <Link
                to={{
                  pathname: `/post/${elem.id}`,
                  state: { userId: props.userId },
                }}
              >
                {elem.title}
              </Link>
            </h3>
          </div>
        );
      })}
    </StyledPosts>
  );
};

export default Posts;
