import React, { useState, useEffect } from "react";
import fetchInfo from "../../fetchInfo";
import EditPost from "./EditPost";
import Showpost from "./ShowPost";
const getPostQuery = (id: string): string => {
  return `query{
    getPost(postId:"${id}") {
    
      title
      description
      createdAt
      creator{
          name
      }
    }
  }`;
};
const deletePostMutation = {};
const editPostMutation = {};
const Post = (props) => {
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
  return (
    <div>
      {error ? (
        <h1>{error}</h1>
      ) : edit ? (
        <EditPost {...post}></EditPost>
      ) : (
        post.title && <Showpost {...post} setEdit={setEdit}></Showpost>
      )}
    </div>
  );
};

export default Post;
