import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useGlobalAuthContext } from "../../AuthContext";
import { useRouter } from "next/router";
import { createOrUpdateUser } from "../../functions/auth";
const RegisterForm = () => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    token,
    setToken,
    email,
    setEmail,
    user,
    setUser,
    userId,
    setUserId,
    username,
    setUsername,
    profilePic,
    setProfilePic,
  } = useGlobalAuthContext();
  // const navigate = useNavigate();

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registrationEmail,
        password
      );
      // Signed in
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
        }

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
        router.reload();
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
            value={registrationEmail}
            onChange={(e) => setRegistrationEmail(e.target.value)}
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
