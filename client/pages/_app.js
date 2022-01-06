import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { useDispatch } from "react-redux";

import auth from "../firebase";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import useDarkMode from "../hooks/useDarkMode";
import DarkModeSwitch from "../components/Navbar/DarkModeSwitch";
import { AuthProvider } from "../AuthContext";
// import rootReducer from "../reducers/rootReducer";
// const store = createStore(rootReducer, composeWithDevTools());

function MyApp({ Component, pageProps }) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       const idTokenResult = await user.getIdTokenResult();
  //       dispatch({
  //         type: "LOGGED_IN_USER",
  //         payload: {
  //           email: user.email,
  //           token: idTokenResult.token,
  //         },
  //       });
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    // <Provider store={store}>
    <AuthProvider>
      <div id="appId" className="flex flex-row">
        <p className="absolute z-10 text-lg font-bold underline uppercase dark:text-bgyellow top-5 left-3 decoration-black dark:decoration-bgyellow decoration-4 underline-offset-8">
          SUBS
        </p>
        <DarkModeSwitch />
        <Navbar />
        <ToastContainer />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
    // </Provider>
  );
}

export default MyApp;
