import React from "react";
import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:8000/api",
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
    "http://localhost:8000/api/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
