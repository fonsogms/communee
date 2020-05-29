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
const Events = (props) => {
  const [events, setEvents] = useState([]);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async (): Promise<void> => {
    const userQuery = await fetchInfo(getUserQuery, []);
    const { errors } = userQuery;

    if (errors) {
      const errorMessage: string = userQuery.errors[0].message;
      console.log(errorMessage);
      setErrors(errorMessage);
    } else {
      const {
        data: { user },
      } = userQuery;
      console.log(user);
      if (user) {
        refreshUserId(user.id);
        const communityQuery = await fetchInfo(findCommunityQuery, [
          user.community,
        ]);

        if (communityQuery.errors) {
          console.log(communityQuery.errors[0].message);
          setErrors(communityQuery.errors[0].message);
        } else {
          refreshCommunityId(user.community);
          console.log(communityQuery);
          setEvents(communityQuery.data.findCommunity.events);
        }
      }
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
                {getUserId() == elem.organizer ? <button>Delete</button> : null}
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Events;
