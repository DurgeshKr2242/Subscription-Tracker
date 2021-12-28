import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import useDarkMode from "../hooks/useDarkMode";
import DarkModeSwitch from "../components/Navbar/DarkModeSwitch";

function MyApp({ Component, pageProps }) {
  const [enabled, setEnabled] = useDarkMode();

  // useEffect(() => {
  //   let themeFromLocalStorage = localStorage.getItem("dark-theme");
  //   setIsDark(themeFromLocalStorage);
  // }, []);
  // const isDark = localStorage.getItem("dark-theme");
  return (
    <div id="appId" className={`flex flex-row dark ${enabled && "dark"}`}>
      <p className="absolute z-10 text-lg font-bold underline uppercase dark:text-bgyellow top-5 left-3 decoration-black dark:decoration-bgyellow decoration-4 underline-offset-8">
        SUBS
      </p>
      <DarkModeSwitch />
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
