import React from "react";

const ShowPost = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <div>
        <label htmlFor="">{props.creator.name} </label>
        <label htmlFor="">{props.createdAt}</label>
      </div>
      <div>
        <button onClick={() => props.setEdit(true)}> Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default ShowPost;
