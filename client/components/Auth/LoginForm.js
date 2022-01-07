import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
// import { googleAuthProvider } from "../../firebase";
import { googleAuthProvider } from "../../firebase";
import { auth } from "../../firebase";
import { useGlobalAuthContext } from "../../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
const LoginForm = () => {
  // const [email, setEmail] = useState("youngporkey2242@gmail.com");
  const [loginEmail, setLoginEmail] = useState("youngporkey2242@gmail.com");
  const [password, setPassword] = useState("qwertyuiop");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const { token, setUser, setEmail, setToken } = useGlobalAuthContext();
  const { token, setEmail, setUser, setToken } = useGlobalAuthContext();

  useEffect(() => {
    if (token) router.push("/");
  }, [token]);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("LOGGING IN!!!");
      console.log(auth);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        password
      );
      console.log("LOGed IN!!!");
      const user = userCredential.user;
      const idTokenResult = await user.getIdTokenResult();
      setUser(user);
      setToken(idTokenResult.token);
      setEmail(user.email);
      // console.log("TOKEN", idTokenResult.token);

      toast.success("LOGGED IN", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

      setToken(idTokenResult.token);
      console.log(idTokenResult.token);
      setUser(user);
      setEmail(user.email);
      console.log(user);

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
      // router.push("/");
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
      <button onClick={googleLoginHandler} className="rounded-full">
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
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
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
