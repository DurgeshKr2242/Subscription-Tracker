import React from "react";

const SingleSubscription = ({ postData }) => {
  const {
    service,
    cost,
    imageUrl,
    startedOn,
    endsOn,
    daysRemaining, //TODO Change this to total Days both in frontend and backend
    sharedWith,
  } = postData;
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
  const getNoOfDays = (date1, date2) => {
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // console.log(Difference_In_Days);
    return Difference_In_Days;
  };
  const startDate = new Date(startedOn);
  const endDate = new Date(endsOn);
  const dayRemaining = Math.round(getNoOfDays(startDate, new Date()));
  const dayRemainingInPercentage = Math.round(
    (dayRemaining / daysRemaining) * 100
  );
  // console.log(dayRemaining);
  // console.log(Math.round(dayRemaining));
  // console.log(daysRemaining);
  // console.log(Math.round((dayRemaining / daysRemaining) * 100));
  return (
    <div className="relative flex flex-col gap-0 mb-12 text-sm">
      <div className="relative flex flex-col items-center gap-4 tracking-wide tablet-s:flex-col">
        <img
          className="rounded-full shadow-md max-w-18 max-h-18 dark:shadow-black shadow-gray-400"
          src="https://logo.clearbit.com/sawolabs.com"
          alt="sawoLabsLogo"
        />
        <div className="flex flex-col w-full gap-4 p-4 rounded-lg hover:scale-110 transition-transform duration-200 cursor-pointer dark:bg-bgBlackSec bg-bgWhiteSec shadow-md dark:shadow-black shadow-gray-400  min-w-[300px]">
          <p className="text-lg font-bold text-center underline underline-offset-2 decoration-bgyellow">
            {service}
          </p>
          <p className="absolute right-0 py-1 pl-2 pr-1 font-bold text-bgblack bg-bgyellow rounded-tl-md">
            {`$${cost.$numberDecimal}`}
          </p>

          <div className="flex flex-col justify-center gap-6 mt-2 tablet-s:flex-row">
            <p>
              {/* <span className="font-bold uppercase">STARTED : </span> */}
              {`${startDate?.getDate()} ${
                month[startDate?.getMonth()]
              } ${startDate?.getFullYear()}`}
            </p>
            -
            <p>
              {/* <span className="font-bold uppercase">ENDS : </span> */}
              {`${endDate?.getDate()} ${
                month[endDate?.getMonth()]
              } ${endDate?.getFullYear()}`}
            </p>
          </div>
          <div className="flex justify-center gap-2">
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
            {dayRemainingInPercentage < 40 && (
              <div
                className="h-1 bg-green-500 rounded-full"
                style={{
                  width: `${dayRemainingInPercentage}%`,
                }}
              ></div>
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
    </div>
  );
};

export default SingleSubscription;
