import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { googleAuthProvider } from "../../firebase";
import { auth } from "../../firebase";
import { useGlobalAuthContext } from "../../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createOrUpdateUser } from "../../functions/auth";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("youngporkey2242@gmail.com");
  const [password, setPassword] = useState("qwertyuiop");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    token,
    setToken,
    setEmail,
    setUser,
    setUserId,
    setUsername,
    setProfilePic,
  } = useGlobalAuthContext();

  useEffect(() => {
    if (token) router.push("/");
  }, [token]);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        password
      );

      const user = userCredential.user;
      const idTokenResult = await user.getIdTokenResult();
      try {
        const res = await createOrUpdateUser(idTokenResult.token);

        if (res?.data) {
          setToken(idTokenResult.token);
          setUser(user);
          setProfilePic(res.data.picture);
          setUsername(res.data.name);
          setEmail(res.data.email);
          setUserId(res.data._id);

          toast.success("LOGGED IN", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push(`/${res.data._id}/all-subscriptions`);
        }
      } catch (err) {
        console.log(err);
        console.log(err.code);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
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

  const googleLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const googleResult = await signInWithPopup(auth, googleAuthProvider);
      const { user } = googleResult;
      const idTokenResult = await user.getIdTokenResult();

      try {
        const res = await createOrUpdateUser(idTokenResult.token);
        if (res?.data) {
          setToken(idTokenResult.token);
          setUser(user);
          setProfilePic(res.data.picture);
          setUsername(res.data.name);
          setEmail(res.data.email);
          setUserId(res.data._id);
        }

        router.push(`/${res.data._id}/all-subscriptions`);
      } catch (err) {
        console.log(err);
      }
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
      {/* <button onClick={googleLoginHandler} className="rounded-full">
        <FcGoogle className="text-3xl" />
      </button>
      <div className="relative flex items-center w-full gap-3 mt-8">
        <div className="inline-block w-full h-1 bg-gray-200 dark:bg-bgblack"></div>
        <p>OR</p>
        <div className="inline-block w-full h-1 bg-gray-200 dark:bg-bgblack"></div>
      </div> */}
      <form
        className="flex flex-col items-center w-full gap-8"
        onSubmit={loginSubmitHandler}
      >
        <input
          placeholder="Enter your email address"
          className="inputBox bg-bgblack"
          id="email"
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        {/* </div> */}
        {/* <div className="relative w-full mt-8"> */}
        <input
          placeholder="Enter your password"
          className=" inputBox peer bg-bgblack"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* </div> */}
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
