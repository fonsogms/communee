import React from "react";
import { getCommunityId } from "../communityInfo";
import { getUserId } from "../userInfo";
const createPostMutation = (
  title: string,
  description: string,
  community: string
): string => {
  return `mutation{
        createPost(userInput:{title:"${title}",description:"${description}",community:"${community}"}){
          title
          creator
          
        }
      }`;
};
const AddPost = () => {
  return (
    <div>
      <h1>Living the dream</h1>
    </div>
  );
};

export default AddPost;
