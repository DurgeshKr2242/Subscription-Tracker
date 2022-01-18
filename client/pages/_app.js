import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "rsuite/dist/rsuite.min.css";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import DarkModeSwitch from "../components/Navbar/DarkModeSwitch";
import { AuthProvider } from "../AuthContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  <Head>
    <meta charset="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
    />
    <meta
      name="description"
      content="Platform for tracking subscriptions and all of your friends with whom you often share your subscriptions. You may also add people with whom you share your subscriptions and never forget who all the individuals with whom you shared your subscriptions are again. So get rid of all your stress related to your subscriptions because we are going to take care of your subcriptions and trck them."
    />
    <meta
      name="keywords"
      content="subs subscription-tracker subscriptionTracker subscription tracker subscribe track subscriptiontrackerapp subscriptionTrack subscriptiontrackapp"
    />
    <title>SUBS</title>
  </Head>;

  return (
    <AuthProvider>
      <div id="appId" className="flex flex-row">
        <p
          onClick={() => router.push(`/`)}
          className="absolute z-[60] text-lg font-bold underline uppercase dark:text-bgyellow top-5 left-3 decoration-black dark:decoration-bgyellow decoration-4 underline-offset-8"
        >
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
