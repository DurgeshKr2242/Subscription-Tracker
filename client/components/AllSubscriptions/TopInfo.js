import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TopInfo = () => {
  const [durationActive, setDurationActive] = useState(true);
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex flex-col items-center gap-8 px-2 py-6 tracking-wider uppercase transition-all duration-200 border-2 hover:shadow-lg hover:dark:shadow-gray-800 hover:shadow-gray-300 tablet-s:p-8 rounded-xl border-bgyellow">
        <h2 className="text-xl font-bold ">
          Total Subscriptons :
          <span className="underline decoration-bgyellow underline-offset-2 decoration-4">
            06
          </span>
        </h2>
        <div className="flex flex-col gap-4 font-bold tablet-s:flex tablet-s:flex-row ">
          <h2 className="text-lg">Sort : </h2>
          <div className="flex gap-2 text-md">
            <motion.button
              whileHover={{ scale: 1.1 }}
              //   initial={{ x: "50%", scale: 0 }}
              //   animate={{ x: 0, scale: 1 }}
              //   transition={{ duration: 0.5, ease: "easeInOut" }}
              whileTap={{ scale: 0.9 }}
              className={`${
                durationActive && "bg-bgyellow text-bgblack"
              } px-2 rounded-xl font-semibold tracking-wide`}
              onClick={() => setDurationActive(true)}
            >
              Duration
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              //   initial={{ x: "50%", scale: 0 }}
              //   transition={{ duration: 0.5, ease: "easeInOut" }}
              //   animate={{ x: 0, scale: 1 }}
              whileTap={{ scale: 0.9 }}
              className={`${
                !durationActive && "bg-bgyellow text-bgblack"
              } px-2 rounded-xl font-semibold tracking-wide`}
              onClick={() => setDurationActive(false)}
            >
              Time Remaining
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
