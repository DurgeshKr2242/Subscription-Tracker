import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { useGlobalAuthContext } from "../../AuthContext";
import axios from "axios";
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

const SingleSubscription = ({ postData }) => {
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
    // console.log(Difference_In_Days);
    return Difference_In_Days;
  };
  const startDate = new Date(startedOn);
  const endDate = new Date(endsOn);
  const dayRemaining = Math.round(getNoOfDays(startDate, new Date()));
  const dayRemainingInPercentage = Math.round((dayRemaining / duration) * 100);

  const deleteHandler = async () => {
    const res = await axios.delete(`http://localhost:8000/api/posts/${id}`);
    router.reload(window.location.pathname);
  };

  return (
    <div className="flex relative tablet-s:flex-row flex-col gap-5 w-full p-5 rounded-lg tablet-s:max-w-[400px] max-w-[300px] dark:bg-bgBlackSec bg-bgWhiteSec dark:text-white text-black items-center shadow-md dark:shadow-black shadow-gray-400">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="z-20 absolute p-1.5 text-black rounded-full bg-bgyellow -right-2 -top-2"
      >
        <MdMenuOpen />
      </button>
      {menuOpen && (
        <div className="absolute top-0 bottom-0 right-0 z-10 flex flex-col justify-center w-[33%] gap-3 px-2 bg-black ">
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
        </div>
      )}
      <img
        className="rounded-lg shadow-md max-w-24 max-h-24 dark:shadow-black shadow-gray-400"
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
              <p className="text-sm text-gray-800 dark:text-gray-200 font">{`${duration} days`}</p>
            </div>
            <div className="flex gap-1 text-gray-800 dark:text-gray-300">
              <p>{`${startDate?.getDate()} ${month[startDate?.getMonth()]}`}</p>
              -<p>{`${endDate?.getDate()} ${month[endDate?.getMonth()]}`}</p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <p>{`$${cost}`}</p>
            <div className="flex justify-center gap-1 bg-opacity-100">
              {sharedWith.map((share) => {
                return (
                  <img
                    key={share._id}
                    className="z-0 rounded-full opacity-70 max-w-4 max-h-4"
                    src={share.picture}
                    alt="NoDp1"
                  />
                );
              })}
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
          {dayRemainingInPercentage >= 75 && (
            <div
              className="h-1 bg-red-500 rounded-full"
              style={{
                width: `${dayRemainingInPercentage}%`,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
    // <div className="relative flex flex-col gap-0 mb-0 text-sm">
    //   <div className="relative flex flex-col items-center gap-8 tracking-wide tablet-s:flex-row py-8 pl-4 pr-8 shadow-md tablet-s:px-8 tablet-s:gap-8 dark:shadow-black rounded-xl bg-bgWhiteSec dark:bg-bgBlackSec min-w-[300px]">
    //     <img
    //       className="rounded-full shadow-md max-w-18 max-h-18 dark:shadow-black shadow-gray-400"
    //       src="https://logo.clearbit.com/sawolabs.com"
    //       alt="sawoLabsLogo"
    //     />
    //     <div className="flex flex-col items-center w-full gap-4">
    //       <p className="text-xl font-bold text-center underline underline-offset-2 decoration-bgyellow">
    //         {service}
    //       </p>
    //       <p className="absolute left-0 py-1 pl-2 pr-1 font-bold rounded-tl-sm rounded-bl-sm text-bgblack bg-bgyellow">
    //         {`$${cost}`}
    //       </p>

    //       <div className="flex flex-col items-center justify-center gap-1 mt-2 tablet-s:flex-row">
    //         <p>
    //           {/* <span className="font-bold uppercase">STARTED : </span> */}
    //           {`${startDate?.getDate()} ${
    //             month[startDate?.getMonth()]
    //           } ${startDate?.getFullYear()}`}
    //         </p>
    //         -
    //         <p>
    //           {/* <span className="font-bold uppercase">ENDS : </span> */}
    //           {`${endDate?.getDate()} ${
    //             month[endDate?.getMonth()]
    //           } ${endDate?.getFullYear()}`}
    //         </p>
    //       </div>
    //       <div className="flex justify-center gap-2">
    //         <img
    //           className="rounded-full max-w-6 max-h-6"
    //           src="/noDp1.jpg"
    //           alt="NoDp1"
    //         />
    //         <img
    //           className="rounded-full max-w-6 max-h-6"
    //           src="/noDp1.jpg"
    //           alt="NoDp1"
    //         />
    //         <img
    //           className="rounded-full max-w-6 max-h-6"
    //           src="/noDp1.jpg"
    //           alt="NoDp1"
    //         />
    //       </div>
    //       <div className="w-full h-1 mb-0 bg-gray-200 ">
    //         {dayRemainingInPercentage < 40 && (
    //           <div
    //             className="h-1 bg-green-500 rounded-full"
    //             style={{
    //               width: `${dayRemainingInPercentage}%`,
    //             }}
    //           ></div>
    //         )}
    //         {dayRemainingInPercentage >= 40 && dayRemainingInPercentage < 75 && (
    //           <div
    //             className="h-1 bg-yellow-500 rounded-full"
    //             style={{
    //               width: `${dayRemainingInPercentage}%`,
    //             }}
    //           ></div>
    //         )}
    //         {dayRemainingInPercentage >= 75 && (
    //           <div
    //             className="h-1 bg-red-500 rounded-full"
    //             style={{
    //               width: `${dayRemainingInPercentage}%`,
    //             }}
    //           ></div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SingleSubscription;
