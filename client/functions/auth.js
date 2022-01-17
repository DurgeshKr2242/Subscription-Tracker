import React from "react";
import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/auth/current-user`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/auth/add-friend/${fid}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getPostByUserId = async (uid) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/user/${uid}`);
};
export const getPostById = async (pid) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${pid}`);
};
