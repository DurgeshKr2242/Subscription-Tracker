import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { useGlobalAuthContext } from "../../AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SingleSubscription = ({ postData, index }) => {
  const {
    service,
    cost,
    imageUrl,
    startedOn,
    endsOn,
    duration, //TODO Change this to total Days both in frontend and backend
    sharedWith,
    id,
  } = postData;

  const [menuOpen, setMenuOpen] = useState(false);
  const { userId } = useGlobalAuthContext();
  const router = useRouter();

  const getNoOfDays = (date1, date2) => {
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  };
  const startDate = new Date(startedOn);
  const endDate = new Date(endsOn);
  const dayRemaining = Math.round(getNoOfDays(startDate, new Date()));
  const dayRemainingInPercentage = Math.round((dayRemaining / duration) * 100);

  const deleteHandler = async () => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
    );
    router.reload(window.location.pathname);
  };

  return (
    <motion.div
      variants={{
        hidden: {
          y: -100,
          opacity: 0,
        },
        visible: (i) => ({
          y: 0,
          opacity: 1,
          transition: {
            delay: index * 0.05,
          },
        }),
      }}
      initial="hidden"
      animate="visible"
      custom={index}
      className={`${
        dayRemainingInPercentage >= 100 && "grayscale"
      } flex relative tablet-s:flex-row flex-col gap-5 w-full p-5 rounded-lg tablet-s:max-w-[400px] max-w-[300px] dark:bg-bgBlackSec bg-bgWhiteSec dark:text-white text-black items-center shadow-md dark:shadow-black shadow-gray-400`}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="z-20 absolute p-1.5 text-black rounded-full bg-bgyellow -right-2 -top-2"
      >
        <MdMenuOpen />
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            animate={{ width: "33%", height: "100%", scale: 1 }}
            initial={{ width: 0, height: 0, scale: 0 }}
            exit={{ width: 0, height: 0, scale: 0 }}
            className="absolute top-0 bottom-0 right-0 z-10 flex flex-col justify-center w-[33%] gap-3 px-2 bg-black text-white"
          >
            <p
              className="w-full py-1 text-center rounded-md cursor-pointer hover:bg-bgBlackSec"
              onClick={() => router.push(`/${userId}/edit/${id}`)}
            >
              Edit
            </p>
            <p
              className="w-full py-1 text-center rounded-md cursor-pointer hover:bg-bgBlackSec"
              onClick={deleteHandler}
            >
              Delete
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <img
        className="rounded-lg shadow-md max-w-[80px] min-w-[80px] dark:shadow-black shadow-gray-400"
        src={imageUrl}
        alt="sawoLabsLogo"
      />
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex justify-between w-full h-full">
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-base font-extrabold tracking-wide uppercase">
                {service}
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-200 font">{`${Math.round(
                getNoOfDays(new Date(), endDate)
              )} days`}</p>
            </div>
            <div className="flex gap-1 text-gray-800 dark:text-gray-300">
              <p>{`${startDate?.getDate()} ${month[startDate?.getMonth()]}`}</p>
              -<p>{`${endDate?.getDate()} ${month[endDate?.getMonth()]}`}</p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <p>{`$${cost}`}</p>
            <div className="flex justify-center gap-1 -space-x-4 bg-opacity-100">
              {/* <div className="-space-x-4"> */}
              {sharedWith.map((share) => {
                return (
                  <>
                    <img
                      key={share._id}
                      className="z-0 w-6 h-6 rounded-full opacity-90"
                      src={share.picture}
                      alt="NoDp1"
                    />
                  </>
                );
              })}
              {/* </div> */}
              {/* <img
                className="rounded-full opacity-70 max-w-4 max-h-4"
                src="/noDp1.jpg"
                alt="NoDp1"
              />
              <img
                className="rounded-full opacity-70 max-w-4 max-h-4"
                src="/noDp1.jpg"
                alt="NoDp1"
              />
              <img
                className="rounded-full opacity-70 max-w-4 max-h-4"
                src="/noDp1.jpg"
                alt="NoDp1"
              /> */}
            </div>
          </div>
        </div>

        <div>
          {dayRemainingInPercentage < 40 && (
            <div className="relative">
              <div
                className="h-1 bg-green-500 rounded-full"
                style={{
                  width: `${dayRemainingInPercentage}%`,
                }}
              ></div>
            </div>
          )}
          {dayRemainingInPercentage >= 40 && dayRemainingInPercentage < 75 && (
            <div
              className="h-1 bg-yellow-500 rounded-full"
              style={{
                width: `${dayRemainingInPercentage}%`,
              }}
            ></div>
          )}
          {dayRemainingInPercentage >= 75 && dayRemainingInPercentage <= 100 && (
            <div
              className="h-1 bg-red-500 rounded-full"
              style={{
                width: `${dayRemainingInPercentage}%`,
              }}
            ></div>
          )}
          {dayRemainingInPercentage > 100 && (
            <div
              className="h-1 bg-red-500 rounded-full"
              style={{
                width: "100%",
              }}
            ></div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SingleSubscription;
