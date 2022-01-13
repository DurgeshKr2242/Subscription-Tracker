import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TopInfo = ({ sortHandler }) => {
  const [durationActive, setDurationActive] = useState(true);
  return (
    <div className="flex flex-col items-center w-full mt-28 tablet-s:max-w-[380px] max-w-[300px]">
      <div className="flex flex-col items-start w-full gap-8 px-3 py-6 tracking-wider transition-all duration-200 border-2 hover:shadow-lg hover:dark:shadow-gray-800 hover:shadow-gray-300 tablet-s:p-8 rounded-xl border-bgyellow">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-sm font-bold text-left text-gray-400 ">
              Total Subsciptions
            </p>
            <h1 className="mt-4 text-4xl">06</h1>
          </div>
          <div className="flex flex-col items-end w-full">
            <h3 className="text-sm font-bold text-left text-gray-400 ">
              Total Spent
            </h3>
            <h1 className="mt-4 text-4xl ">₹ 570</h1>
          </div>
        </div>
        {/* <div className="flex flex-col w-full gap-4 font-bold ">
          <p className="text-sm font-bold text-left text-gray-400 ">Sort </p>
          <div className="flex justify-start w-full gap-0 border-2 rounded-xl border-bgyellow text-md">
            <motion.button
              whileHover={{ scale: 1.1 }}
              //   initial={{ x: "50%", scale: 0 }}
              //   animate={{ x: 0, scale: 1 }}
              //   transition={{ duration: 0.5, ease: "easeInOut" }}
              whileTap={{ scale: 0.9 }}
              className={`${
                durationActive && "bg-bgyellow text-bgblack"
              } px-2 py-2 rounded-tl-lg rounded-bl-lg font-semibold tracking-wide w-full`}
              onClick={() => {
                setDurationActive(true);
                sortHandler("cost");
              }}
            >
              Cost
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              //   initial={{ x: "50%", scale: 0 }}
              //   transition={{ duration: 0.5, ease: "easeInOut" }}
              //   animate={{ x: 0, scale: 1 }}
              whileTap={{ scale: 0.9 }}
              className={`${
                !durationActive && "bg-bgyellow text-bgblack"
              } px-2  rounded-tr-lg rounded-br-lg font-semibold tracking-wide w-full`}
              onClick={() => {
                setDurationActive(false);
                sortHandler("duration");
              }}
            >
              Time Remaining
            </motion.button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TopInfo;
