import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { sendSignInLinkToEmail } from "firebase/auth";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    // const config = {
    //   url: "http://localhost:3000/auth/complete",
    //   handleCodeInApp: true,
    // };

    // await sendSignInLinkToEmail(auth, email, config);

    // toast.success(
    //   `Email successfully sent to ${email}. Click the link to complete the registration`,
    //   {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   }
    // );
    // window.localStorage.setItem("emailForRegistrationSubTrack", email);
    // setEmail("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        console.log("created User");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
      });
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
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
