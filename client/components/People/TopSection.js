import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const TopSection = () => {
  const [durationActive, setDurationActive] = useState(true);
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
            className="w-full px-2 py-1 text-sm rounded-md text-bgWhiteSec bg-bgBlackSec"
            placeholder="Person's Name"
          />
          <button className="px-4 py-1 mt-2 text-sm tracking-wide bg-gray-800 rounded-md text-bgWhiteSec">
            Add Person
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
