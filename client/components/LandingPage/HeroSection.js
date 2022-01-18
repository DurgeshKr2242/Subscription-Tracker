import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import track from "./assets/track.png";
import money from "./assets/money.png";
import shareFriends from "./assets/shareFriends.png";
const HeroSection = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* ~~~~~~~~~~~~~HERO SECTION~~~~~~~~~~~~~ */}

      <div className="flex flex-col items-center gap-6 pt-40 mb-40">
        <h1 className="text-5xl font-bold text-center">
          Let&apos;s track your{" "}
          <span className="text-yellow-500 dark:text-bgyellow">
            {" "}
            subscriptions{" "}
          </span>
        </h1>
        <p className="max-w-xl text-lg tracking-wide text-center text-gray-600 dark:text-gray-300">
          Do what you love while we handle and track your subscriptions. Let us
          remove whatever weight we can off your shoulders.
        </p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="px-6 py-2 text-lg font-bold tracking-wide rounded-lg shadow-md shadow-yellow-800 bg-bgyellow text-bgblack"
        >
          Get Started
        </motion.button>
      </div>

      {/* ~~~~~~~~~~~~~ACHIEVEMENTS~~~~~~~~~~~~~ */}
      <div className="flex flex-wrap items-center justify-center w-full gap-12 bg-bgblack dark:bg-white tablet-s:gap-36 py-14 text-bgblack">
        <div className="flex justify-center items-center py-6 px-20 rounded-2xl dark:bg-bgblack dark:text-white bg-bgWhiteSec text-bgblack max-w-[280px] gap-4 ">
          <p className="text-5xl font-bold">59+</p>
          <p>Subscriptions Tracked</p>
        </div>

        <div className="flex justify-center items-center py-6 px-20 rounded-2xl dark:bg-bgblack dark:text-white bg-bgWhiteSec text-bgblack max-w-[280px] gap-4">
          <p className="text-5xl font-bold">10+</p>
          <p>Active Users</p>
        </div>
      </div>
      {/* ~~~~~~~~~~~~~WHAT WE OFFER~~~~~~~~~~~~~ */}

      <div className="flex flex-col items-center justify-center w-full px-10 pt-12 lg:px-32 tablet-s:px-32">
        <h1 className="mb-4 text-5xl font-bold text-bgblack dark:text-gray-300">
          What do we offer?
        </h1>
        <div className="flex flex-col items-center justify-between w-full gap-6 py-20 tablet-s:flex-row">
          <div className="flex flex-col items-start max-w-md gap-4">
            <h2 className="text-3xl font-bold text-yellow-500 dark:text-bgyellow">
              Track the expiration date
            </h2>
            <p className="text-lg text-left text-gray-600 dark:text-gray-300">
              We track the let you know the time remaining until your
              subscription ends. We even notify you to renew your subscription
              incase you forgot.
            </p>
          </div>
          <div className="max-w-xs">
            <Image src={track} alt="track subscription" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full gap-6 py-20 tablet-s:flex-row-reverse">
          <div className="flex flex-col items-end max-w-md gap-4">
            <h2 className="text-3xl font-bold text-yellow-500 dark:text-bgyellow">
              We track the money you spend
            </h2>
            <p className="text-lg text-right text-gray-600 dark:text-gray-300">
              We track the let you know the time remaining until your
              subscription ends. We even notify you to renew your subscription
              incase you forgot.
            </p>
          </div>
          <div className="max-w-xs">
            <Image src={money} alt="track subscription money" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full gap-6 py-20 tablet-s:flex-row">
          <div className="flex flex-col items-start max-w-md gap-4">
            <h2 className="text-3xl font-bold text-yellow-500 dark:text-bgyellow">
              Track the subscriptions you share with your friends.
            </h2>
            <p className="text-lg text-left text-gray-600 dark:text-gray-300">
              We track the let you know the time remaining until your
              subscription ends. We even notify you to renew your subscription
              incase you forgot.
            </p>
          </div>
          <div className="max-w-xs">
            <Image src={shareFriends} alt="track subscription money" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
