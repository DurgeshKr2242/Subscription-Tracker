import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "rsuite/dist/rsuite.min.css";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import DarkModeSwitch from "../components/Navbar/DarkModeSwitch";
import { AuthProvider } from "../AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div id="appId" className="flex flex-row">
        <p className="absolute z-[60] text-lg font-bold underline uppercase dark:text-bgyellow top-5 left-3 decoration-black dark:decoration-bgyellow decoration-4 underline-offset-8">
          SUBS
        </p>
        <DarkModeSwitch />
        <Navbar />
        <ToastContainer />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
