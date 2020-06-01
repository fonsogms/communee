import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchInfo from "../../fetchInfo";
import { getCommunityId, refreshCommunityId } from "../../communityInfo";
import { getUserId, refreshUserId } from "../../userInfo";
const getEventQuery = (id: string): string => {
  return `query{
        getEvent(id:"${id}"){
          title
          date
          description
          where
          organizer
        }
      }`;
};

const EventDetails = (props) => {
  const [error, setError] = useState("");
  const [event, setEvent] = useState({});
  const { id } = props.match.params;
  useEffect(() => {
    getData();
  }, []);
  const getData = async (): Promise<void> => {
    const response = await fetchInfo(getEventQuery, [id]);
    const { errors } = response;
    const { data } = response;
    if (errors) {
      const errorMessage: string = errors[0].message;
      console.log(errorMessage);
      setError(errorMessage);
    } else {
      const { getEvent } = data;
      console.log(getEvent);
      setEvent(getEvent);
    }
  };
  console.log(props.match.params);

  return <div></div>;
};

export default EventDetails;
