import React, { useState, useEffect } from "react";
import { getCommunityId } from "../communityInfo";
import { getUserId } from "../userInfo";
import fetchInfo from "../fetchInfo";
const createPostMutation = (
  title: string,
  description: string,
  community: string
): string => {
  return `mutation{
        createPost(userInput:{title:"${title}",description:"${description}",community:"${community}"}){
          title
          description
          creator
          
        }
      }`;
};
const AddPost = (props) => {
  const [input, setInput] = useState({
    title: "Write your title here",
    description: "Write your description",
  });
  const [error, setError] = useState("");

  const changeInput = (e): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitData = async () => {
    const response = await fetchInfo(createPostMutation, [
      ...Object.values(input),
      getCommunityId(),
    ]);
    const { errors } = response;
    const { data } = response;
    if (errors) {
      const errorMessage: string = errors[0].message;
      console.log(errorMessage);
      setError(errorMessage);
    } else {
      const { createPost } = data;

      if (createPost) {
        props.history.push("/home");
      }
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={changeInput}
          name="title"
          value={input.title}
        />
      </div>
      <div>
        <input
          type="text"
          onChange={changeInput}
          name="description"
          value={input.description}
        />
      </div>
      <div>
        <button onClick={submitData}>Create Post</button>
      </div>
    </div>
  );
};

export default AddPost;
