import React, { useState, useEffect } from "react";
import fetchInfo from "../fetchInfo";
import styled from "styled-components";
import { getCommunityId } from "../communityInfo";
const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
`;
const createEventMutation = (
  title: string,
  description: string,
  where: string,
  date: string,
  community: string
): string => {
  return `mutation{
    createEvent( userInput:{ date: "${date}",
      title: "${title}",
      description: "${description}",
      where: "${where}",
      community: "${community}"})
      {
      title
    }
  }`;
};
const AddEvent = (props) => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    where: "",
    date: "",
  });
  const changeInput = (e: {
    target: {
      name: string;
      value: string;
    };
  }): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const addEvent = async (): Promise<void> => {
    const response = await fetchInfo(createEventMutation, [
      ...Object.values(input),
      getCommunityId(),
    ]);
    const { errors } = response;
    const { data } = response;
    if (errors) {
      const errorMessage: string = errors[0].message;
      console.log(errorMessage);
    } else {
      props.history.push("/events");
    }
    console.log(response);
  };
  console.log(input);
  return (
    <div>
      <StyledForm>
        <div>
          <h4>Choose the title</h4>
          <input name="title" onChange={changeInput} type="text" />
        </div>
        <div>
          <h4>Choose the description</h4>

          <input name="description" onChange={changeInput} type="text" />
        </div>
        <div>
          <h4>Choose the date</h4>

          <input name="date" onChange={changeInput} type="date" />
        </div>
        <div>
          <h4>Choose the floor</h4>

          <input name="where" onChange={changeInput} type="text" />
        </div>
        <div>
          <button onClick={addEvent}>Add event</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default AddEvent;
