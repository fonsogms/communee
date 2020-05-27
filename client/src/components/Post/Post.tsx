import React, { useState, useEffect } from "react";
import fetchInfo from "../../fetchInfo";
import EditPost from "./EditPost";
import Showpost from "./ShowPost";
import { getCommunityId } from "../../communityInfo";
const getPostQuery = (id: string): string => {
  return `query{
    getPost(postId:"${id}") {
    
      title
      description
      createdAt
      creator{
          id
          name
      }
    }
  }`;
};
const deletePostMutation = (id: string, communityId: string): string => {
  return `mutation{
    deletePost(id:"${id}",communityId:"${communityId}"){
      title
    }
  }`;
};
const Post = (props) => {
  console.log(props);
  const [post, setPost] = useState({});
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  const { id }: { id: string } = props.match.params;
  console.log(id);
  useEffect(() => {
    getData();
  }, []);
  const getData = async (): Promise<void> => {
    const postQuery = await fetchInfo(getPostQuery, [id]);
    const { errors } = postQuery;
    const { data } = postQuery;
    if (errors) {
      const errorMessage: string = postQuery.errors[0].message;
      console.log(errorMessage);
      setError(errorMessage);
    } else {
      const { getPost } = data;
      console.log(getPost);
      setPost(getPost);
    }
  };
  const deletePost = async (): Promise<void> => {
    const response = await fetchInfo(deletePostMutation, [
      id,
      getCommunityId(),
    ]);
    const { errors } = response;
    const { data } = response;
    if (errors) {
      const errorMessage: string = response.errors[0].message;
      console.log(errorMessage);
      setError(errorMessage);
    } else {
      props.history.push("/home");
    }
  };
  return (
    <div>
      {error ? (
        <h1>{error}</h1>
      ) : edit ? (
        <EditPost
          {...post}
          id={id}
          setPost={setPost}
          setEdit={setEdit}
          deletePost={deletePost}
        ></EditPost>
      ) : (
        post.title && (
          <Showpost
            {...post}
            deletePost={deletePost}
            setEdit={setEdit}
            userId={props.location.state.userId}
          ></Showpost>
        )
      )}
    </div>
  );
};

export default Post;
