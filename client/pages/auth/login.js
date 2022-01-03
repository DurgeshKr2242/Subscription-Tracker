import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImArrowRight2 } from "react-icons/im";

import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
const Login = () => {
  const [loginActive, setLoginActive] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-2 bg-white dark:bg-bgblack dark:text-white ">
      <motion.button
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        exit={{ scale: 0 }}
        className="flex flex-row items-center justify-center gap-4 px-4 py-2 text-sm font-extrabold tracking-wide uppercase rounded-md shadow-sm bg-bgyellow shadow-yellow-900 text-bgblack"
        onClick={() => setLoginActive(!loginActive)}
      >
        {loginActive ? "Create a new account" : "Switch to login"}
        <ImArrowRight2 />
      </motion.button>
      <AnimatePresence>
        {loginActive ? <LoginForm /> : <RegisterForm />}
      </AnimatePresence>
    </div>
  );
};

export default Login;
