import React from "react";
import RegisterComplete from "../../components/Auth/RegisterComplete";

const complete = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-2 bg-white dark:bg-bgblack dark:text-white ">
      <RegisterComplete />
    </div>
  );
};

export default complete;
