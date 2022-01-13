import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { addFriend } from "../../functions/auth";
import { useGlobalAuthContext } from "../../AuthContext";

const TopSection = () => {
  const [durationActive, setDurationActive] = useState(true);
  const [friendId, setFriendId] = useState("");
  const { token } = useGlobalAuthContext();

  const addFriendHandler = async (e) => {
    try {
      const res = await addFriend(token, friendId);
      console.log(res);
      toast.success("Friend Added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err.response.data);
      // console.log(err.response.status);
      // console.log(err.response.headers);
      // console.log(err.response.message);
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex flex-col items-center gap-8 px-2 py-6 tracking-wider uppercase transition-all duration-200 border-2 hover:shadow-lg hover:dark:shadow-gray-800 hover:shadow-gray-300 tablet-s:p-8 rounded-xl border-bgyellow min-w-[320px]">
        <h2 className="text-xl font-bold ">
          Total People :
          <span className="underline decoration-bgyellow underline-offset-2 decoration-4">
            14
          </span>
        </h2>

        <div className="flex flex-wrap justify-center">
          <input
            type="text"
            id="addPeople"
            className="inputBox"
            placeholder="Ender your Friend's id"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
          />
          <button
            onClick={addFriendHandler}
            className="px-4 py-1 mt-2 text-sm tracking-wide bg-gray-800 rounded-md text-bgWhiteSec"
          >
            Add Person
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
