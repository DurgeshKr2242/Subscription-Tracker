import React from "react";
// import EditSubscriptionForm from "../../../components/AllSubscriptions/NewSubscriptionForm";
import EditSubscriptionForm from "../../../components/AllSubscriptions/EditSubscription/EditSubscriptionForm";

const Edit = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen h-[100%] pt-28 pb-28 gap-2 bg-white dark:bg-bgblack dark:text-white ">
      <EditSubscriptionForm />
    </div>
  );
};

export default Edit;
