import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchInfo from "../../fetchInfo";
import { getCommunityId, refreshCommunityId } from "../../communityInfo";
import { getUserId, refreshUserId } from "../../userInfo";
const getUserQuery = (): string => {
  return ` query{
          user{
            name
            community
            id
              
          
          }
        }`;
};
const findCommunityQuery = (id: string): string => {
  return `{
    findCommunity(id:"${id}"){
        id
      events{
        id
        title
        where 
        date
        organizer
      }
    }
  }`;
};
const deleteEventMutation = (id: string, communityId: string): string => {
  return `mutation{
    deleteEvent(id:"${id}",communityId:"${communityId}"){
      title
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
    const communityQuery = await fetchInfo(findCommunityQuery, [
      getCommunityId(),
    ]);

    if (communityQuery.errors) {
      console.log(communityQuery.errors[0].message);
      setErrors(communityQuery.errors[0].message);
    } else {
      console.log(communityQuery);
      setEvents(communityQuery.data.findCommunity.events);
    }
  };
  const deleteEvent = async (id: string): Promise<void> => {
    const response = await fetchInfo(deleteEventMutation, [
      id,
      getCommunityId(),
    ]);
    const { errors } = response;
    if (errors) {
      const errorMessage: string = response.errors[0].message;
      console.log(errorMessage);
    } else {
      let filteredEvents = events.filter((elem: any) => {
        return elem.id !== id;
      });
      setEvents(filteredEvents);
    }
  };
  return (
    <div>
      {errors ? (
        <h1>{errors}</h1>
      ) : (
        <ul>
          {events.map((elem: any) => {
            let date = new Date(elem.date);
            return (
              <div>
                <Link
                  to={`/event/${elem.id}`}
                  style={{ textDecoration: "none", color: "Black" }}
                >
                  <div>
                    <h2>{elem.title}</h2>
                    <h5> When: {date.toDateString()}</h5>
                  </div>
                  <p>Where: {elem.where}</p>
                </Link>
                {getUserId() == elem.organizer ? (
                  <button onClick={() => deleteEvent(elem.id)}>Delete</button>
                ) : null}
              </div>
            );
          })}
        </ul>
      )}
      <button>
        <Link to="/event/add">Add Event</Link>
      </button>
    </div>
  );
};

export default Events;
