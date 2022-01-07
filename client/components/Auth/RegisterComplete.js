import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { updateProfile, signInWithEmailLink } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

//! Check if redirect works

const RegisterComplete = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistrationSubTrack"));
  }, []);

  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    if (!email || !password) {
      toast.warn("Please provide your email and password for confirmation", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistrationSubTrack");
        let user = auth.currentUser;
        const updateUser = await updateProfile(user, { password: password });
        // console.log(updateUser);
        console.log(user);
        const idTokenResult = await user.getIdTokenResult();
        console.log(idTokenResult.token);
        // createOrUpdateUser(idTokenResult.token)
        //   .then((res) => {
        //     console.log(res.data);
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

        router.push("/all-subscriptions");
        // navigate("/");
      }
    } catch (error) {
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
          <label className="inputLabel" htmlFor="email">
            Email Id
          </label>
        </div>
        <div className="relative w-full mt-8">
          <input
            placeholder="Enter your password"
            className="inputBox peer dark:text-gray-100"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
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

export default RegisterComplete;
