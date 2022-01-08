import React, { useEffect } from "react";
import AddNewSubscription from "../../../components/AllSubscriptions/AddNewSubscription";
import SingleSubscription from "../../../components/AllSubscriptions/SingleSubscription";
import TopInfo from "../../../components/AllSubscriptions/TopInfo";
import { useGlobalAuthContext } from "../../../AuthContext";
import { useRouter } from "next/router";
const AllSubscriptions = () => {
  const router = useRouter();

  const { token } = useGlobalAuthContext();

  useEffect(() => {
    if (!token) router.replace("/");
  }, []);

  return (
    <div className="w-screen tablet-s:pb-6 pb-14 min-h-screen h-100% dark:bg-bgblack dark:text-white flex flex-col items-center gap-14">
      <TopInfo />
      <AddNewSubscription />
      <SingleSubscription />
      <SingleSubscription />
      <SingleSubscription />
    </div>
  );
};

export default AllSubscriptions;
