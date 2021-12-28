import React from "react";
import AddNewSubscription from "../../components/AllSubscriptions/AddNewSubscription";
import TopInfo from "../../components/AllSubscriptions/TopInfo";

const AllSubscriptions = () => {
  return (
    <div className="w-screen min-h-screen h-100% dark:bg-bgblack dark:text-white">
      <TopInfo />
      <AddNewSubscription />
    </div>
  );
};

export default AllSubscriptions;
