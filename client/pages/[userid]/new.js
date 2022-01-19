import React, { useEffect } from "react";
// import NewSubscriptionForm from "../../components/AllSubscriptions/NewSubscriptionForm";
import dynamic from "next/dynamic";
const NewSubscriptionForm = dynamic(() =>
  import("../../components/AllSubscriptions/NewSubscriptionForm")
);
import { useRouter } from "next/router";
import { useGlobalAuthContext } from "../../AuthContext";
const New = () => {
  const router = useRouter();
  const { token, isLoading } = useGlobalAuthContext();

  useEffect(() => {
    console.log(token === null);
    if (token === null && isLoading === false) router.push("/");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen h-[100%] pt-28 pb-28 gap-2 bg-white dark:bg-bgblack dark:text-white ">
      <NewSubscriptionForm />
    </div>
  );
};

export default New;
