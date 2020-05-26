import React from "react";

const ShowPost = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <div>
        <label htmlFor="">{props.creator.name} </label>
        <label htmlFor="">{props.createdAt}</label>
      </div>
      <div>
        {props.userId == props.creator.id ? (
          <div>
            <button onClick={() => props.setEdit(true)}> Edit</button>
            <button onClick={props.deletePost}>Delete</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShowPost;
