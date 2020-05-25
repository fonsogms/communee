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
    const response = await fetchInfo(editPostMutation, [
      props._id,
      ...Object.values(input),
    ]);
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
        <button>Delete</button>
      </div>
    </div>
  );
};

export default EditPost;
