import React from "react";
import { HiUserRemove } from "react-icons/hi";

const SingleFriend = ({ pfp, name }) => {
  console.log(pfp);
  return (
    <div className="flex items-center gap-4 px-4 py-4 my-6 shadow-md tablet-s:px-8 tablet-s:gap-8 dark:shadow-black rounded-xl bg-bgWhiteSec dark:bg-bgBlackSec">
      <div className="max-w-[13%] tablet-s:max-w-[10%]">
        <img
          className="rounded-full "
          src={pfp ? `${pfp}` : "/noDp1.jpg"}
          alt="dp"
        />
      </div>
      <div className="flex justify-between w-full">
        <p className="text-lg tablet-s:text-xl">{name}</p>
        <button className="p-2 bg-yellow-600 rounded-full dark:bg-bgyellow">
          <HiUserRemove className="text-lg text-black rounded-full tablet-s:text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default SingleFriend;
