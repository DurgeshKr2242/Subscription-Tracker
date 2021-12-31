import React from "react";

const SingleSubscription = () => {
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
  const date = new Date();

  return (
    <div className="flex flex-col gap-0 text-sm">
      {/* <div className="w-full h-1 mb-2 bg-gray-200 ">
        <div
          className="h-1 bg-green-500 rounded-full"
          style={{ width: "55%" }}
        ></div>
      </div> */}
      <div className="flex flex-col items-center gap-4 tracking-wide tablet-s:flex-row">
        <img
          className="rounded-full shadow-md max-w-18 max-h-18 dark:shadow-black shadow-gray-400"
          src="https://logo.clearbit.com/sawolabs.com"
          alt="sawoLabsLogo"
        />
        <div className="flex flex-col w-full gap-4 p-4 rounded-lg dark:bg-bgBlackSec bg-bgWhiteSec shadow-md dark:shadow-black shadow-gray-400  min-w-[300px]">
          <p className="text-base">SAWO Labs</p>
          <p>
            <span className="font-bold uppercase">COST : </span>$999{" "}
          </p>

          <div className="flex flex-col gap-6 tablet-s:flex-row">
            <p>
              <span className="font-bold uppercase">STARTED : </span>
              {`${date.getDate()} ${
                month[date.getMonth()]
              } ${date.getFullYear()}`}
            </p>
            <p>
              <span className="font-bold uppercase">ENDS : </span>
              {`${date.getDate()} ${
                month[date.getMonth()]
              } ${date.getFullYear()}`}
            </p>
          </div>
          <div className="flex gap-1">
            <img
              className="rounded-full max-w-6 max-h-6"
              src="/noDp1.jpg"
              alt="NoDp1"
            />
            <img
              className="rounded-full max-w-6 max-h-6"
              src="/noDp1.jpg"
              alt="NoDp1"
            />
            <img
              className="rounded-full max-w-6 max-h-6"
              src="/noDp1.jpg"
              alt="NoDp1"
            />
          </div>
          <div className="w-full h-1 mb-0 bg-gray-200 ">
            <div
              className="h-1 bg-green-500 rounded-full"
              style={{ width: "55%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSubscription;
