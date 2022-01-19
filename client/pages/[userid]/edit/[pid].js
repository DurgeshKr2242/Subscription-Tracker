import React, { useEffect } from "react";
import dynamic from "next/dynamic";
// import EditSubscriptionForm from "../../../components/AllSubscriptions/NewSubscriptionForm";
const EditSubscriptionForm = dynamic(() =>
  import(
    "../../../components/AllSubscriptions/EditSubscription/EditSubscriptionForm"
  )
);
import { useRouter } from "next/router";
import { useGlobalAuthContext } from "../../../AuthContext";
const Edit = () => {
  const router = useRouter();
  const { token, isLoading } = useGlobalAuthContext();

  useEffect(() => {
    console.log(token === null);
    if (token === null && isLoading === false) router.push("/");
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen h-[100%] pt-28 pb-28 gap-2 bg-white dark:bg-bgblack dark:text-white ">
      <EditSubscriptionForm />
    </div>
  );
};

export default Edit;
