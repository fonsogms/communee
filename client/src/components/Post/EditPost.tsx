import React, { useState, useEffect } from "react";
import fetchInfo from "../../fetchInfo";
const editPostMutation = (
  id: string,
  title: string,
  description: string
): string => {
  return `mutation{
        updatePost(userInput:{id:"${id}",title:"${title}",description:"${description}"}) {
            title
            description
            }

      }`;
};
const EditPost = (props) => {
  const [input, setInput] = useState({
    title: props.title,
    description: props.description,
  });
  const changeInput = (e) => {
    console.log(e.target.name, e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const saveData = async (): Promise<void> => {
    console.log("this is props", props);
    const response = await fetchInfo(editPostMutation, [
      props.id,
      ...Object.values(input),
    ]);
    const { errors } = response;
    const { data } = response;
    if (errors) {
      const errorMessage: string = response.errors[0].message;
      console.log(errorMessage);
    } else {
      const { updatePost } = data;
      props.setPost({ ...props, ...updatePost });
      props.setEdit(false);
    }
    console.log(response);
  };
  return (
    <div>
      <div>
        <h5>change title</h5>
        <input
          name="title"
          value={input.title}
          onChange={changeInput}
          type="text"
        />
      </div>
      <div>
        <input
          name="description"
          type="text"
          value={input.description}
          onChange={changeInput}
        />
      </div>

      <div>
        <button onClick={saveData}>Save</button>
        <button onClick={props.deletePost}>Delete</button>
      </div>
    </div>
  );
};

export default EditPost;
