import React from "react";
import { motion } from "framer-motion";
const RegisterForm = () => {
  const registerSubmitHandler = (e) => {
    e.preventDefault();
    console.log("REGISTERD");
  };

  return (
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
      className="flex flex-col items-center px-6 pt-4 pb-8 rounded-lg dark:bg-bgBlackSec bg-bgWhiteSec shadow-md dark:shadow-black shadow-gray-400  min-w-[280px]"
    >
      <p className="mb-8 text-2xl font-extrabold tracking-wide underline dark:text-white text-bgblack decoration-bgyellow underline-offset-2 decoration-4">
        REGISTER
      </p>

      <form
        className="flex flex-col items-center w-full"
        onSubmit={registerSubmitHandler}
      >
        <div className="relative w-full mt-8">
          <input
            placeholder="Enter your email address"
            className="inputBox peer dark:text-gray-100"
            id="email"
            type="email"
          />
          <label className="inputLabel" htmlFor="email">
            Email Id
          </label>
        </div>
        <div className="relative w-full mt-8">
          <input
            placeholder="Enter your email address"
            className="inputBox peer dark:text-gray-100"
            id="password"
            type="password"
          />
          <label className="inputLabel" htmlFor="password">
            Password
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-8 text-sm font-extrabold tracking-wide uppercase rounded-md shadow-md bg-bgyellow shadow-yellow-900 text-bgblack"
        >
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
