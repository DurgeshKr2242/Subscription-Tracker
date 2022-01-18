import React, { useState } from "react";

import { motion } from "framer-motion";
import { ImSun } from "react-icons/im";
import { MdDarkMode } from "react-icons/md";

import useDarkMode from "../../hooks/useDarkMode";

const DarkModeSwitch = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();

  return (
    <motion.button
      layout
      onClick={() => setDarkTheme(!darkTheme)}
      className={`absolute top-[-7px] right-5 px-3 py-3 mt-6 text-lg rounded-3xl hover:rounded-lg flex justify-center items-center text-yellow-600 bg-gray-100 overflow-hidden transition-all duration-300 ease-linear dark:bg-gray-900 ${
        darkTheme && "group"
      }`}
      name="light/dark-mode-switch"
      aria-label="light/dark-mode-switch"
    >
      <ImSun
        className={`transition-all duration-300 ease-linear ${
          !darkTheme && "scale-0"
        }`}
      />
      <MdDarkMode
        className={`transition-all duration-300 ease-linear absolute ${
          darkTheme && "scale-0"
        }`}
      />
    </motion.button>
  );
};

export default DarkModeSwitch;
