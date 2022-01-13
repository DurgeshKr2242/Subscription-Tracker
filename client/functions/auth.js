import React from "react";
import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/auth",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:8000/api/auth/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addFriend = async (authtoken, fid) => {
  return axios.post(
    `http://localhost:8000/api/auth/add-friend/${fid}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getPostByUserId = async (uid) => {
  return axios.get(`http://localhost:8000/api/posts/user/${uid}`);
};
export const getPostById = async (pid) => {
  return axios.get(`http://localhost:8000/api/posts/${pid}`);
};
