import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import { auth } from "../../firebase";
import { useGlobalAuthContext } from "../../AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { token } = useGlobalAuthContext();

  useEffect(() => {
    if (token) router.push("/");
  }, [token]);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      console.log(user);
      console.log("TOKEN", idTokenResult.token);
      toast.successc("LOGGED IN", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // createOrUpdateUser(idTokenResult.token)
      //   .then((res) => {
      //     dispatch({
      //       type: "LOGGED_IN_USER",
      //       payload: {
      //         name: res.data.name,
      //         email: res.data.email,
      //         token: idTokenResult.token,
      //         role: res.data.role,
      //         _id: res.data._id,
      //       },
      //     });
      //   })
      //   .catch((err) => {
      //     console.log("ERR IN CLIENT LOGIN SUBMIT HANDLER", err);
      //   });
      setLoading(false);

      router.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message, {
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
    <motion.div
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
      className="flex flex-col items-center px-6 pt-4 pb-8 rounded-lg dark:bg-bgBlackSec bg-bgWhiteSec shadow-md dark:shadow-black shadow-gray-400  min-w-[280px]"
    >
      <p className="mb-8 text-2xl font-extrabold tracking-wide underline dark:text-white text-bgblack decoration-bgyellow underline-offset-2 decoration-4">
        LOGIN
      </p>
      <button className="rounded-full">
        <FcGoogle className="text-3xl" />
      </button>
      <div className="relative flex items-center w-full gap-3 mt-8">
        <div className="inline-block w-full h-1 bg-gray-200 dark:bg-bgblack"></div>
        <p>OR</p>
        <div className="inline-block w-full h-1 bg-gray-200 dark:bg-bgblack"></div>
      </div>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={loginSubmitHandler}
      >
        <div className="relative w-full mt-8">
          <input
            placeholder="Enter your email address"
            className="inputBox peer dark:text-gray-100"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="inputLabel" htmlFor="password">
            Password
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 mt-8 text-sm font-extrabold tracking-wide uppercase rounded-md shadow-md bg-bgyellow shadow-yellow-900 text-bgblack"
        >
          Login
        </button>
      </form>
    </motion.div>
  );
};

export default LoginForm;
