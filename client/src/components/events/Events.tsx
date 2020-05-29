import React, { useState, useEffect } from "react";
import fetchInfo from "../../fetchInfo";
import { getCommunityId } from "../../communityInfo";
const findCommunityQuery = (id: string): string => {
  return `{
    findCommunity(id:"${id}"){
      events{
        id
        description
        title
        where 
        date
      }
    }
  }`;
};
const Events = (props) => {
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async (): Promise<void> => {
    const response = await fetchInfo(findCommunityQuery, [getCommunityId()]);
    const { errors } = response;
    const { data } = response;
    if (errors) {
      const errorMessage: string = errors[0].message;
      setErrors(errorMessage);
    } else {
      const { findCommunity } = data;
      setEvents(findCommunity.events);
    }
  };
  return (
    <div>
      {errors ? (
        <h1>{errors}</h1>
      ) : (
        <ul>
          {events.map((elem) => {
            let date = new Date(elem.date);
            return (
              <div>
                <div>
                  {" "}
                  <h2>{elem.title}</h2>
                  <h5>Where: {elem.where}</h5>
                </div>
                <p>Date: {date.toDateString()}</p>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Events;
