import React from "react";
// import NewSubscriptionForm from "../../components/AllSubscriptions/NewSubscriptionForm";
import NewSubscriptionForm from "../../components/AllSubscriptions/NewSubscriptionForm";

const New = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen h-[100%] pt-28 pb-28 gap-2 bg-white dark:bg-bgblack dark:text-white ">
      <NewSubscriptionForm />
    </div>
  );
};

export default New;
