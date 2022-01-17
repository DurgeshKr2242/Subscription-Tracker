import React, { useEffect, useState } from "react";
import AddNewSubscription from "../../../components/AllSubscriptions/AddNewSubscription";
import SingleSubscription from "../../../components/AllSubscriptions/SingleSubscription";
import { useGlobalAuthContext } from "../../../AuthContext";
import { useRouter } from "next/router";
import { getPostByUserId } from "../../../functions/auth";
import { motion, AnimatePresence } from "framer-motion";

const AllSubscriptions = () => {
  const [durationActive, setDurationActive] = useState(true);
  const [allPost, setAllPost] = useState([]);
  const router = useRouter();
  const { isLoading, token, userId, user } = useGlobalAuthContext();

  const getNoOfDays = (date1, date2) => {
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  };

  useEffect(() => {
    if (!isLoading && !token) router.replace("/");
    if (!isLoading && token) {
      const getAllPost = async () => {
        const allPost = await getPostByUserId(userId);

        setAllPost(
          allPost.data.posts.sort((a, b) => {
            return a.cost - b.cost;
          })
        );
        console.log(allPost.data.posts);
      };

      getAllPost();
    }
  }, [isLoading, token]);

  const costClickHandler = () => {
    setDurationActive(true);
    setAllPost(
      allPost.sort((a, b) => {
        return a.cost - b.cost;
      })
    );
  };

  const durationClickHandler = () => {
    setDurationActive(false);
    setAllPost(
      allPost.sort((a, b) => {
        return a.duration - new Date() - (b.duration - new Date());
      })
    );
  };

  return (
    <div className="w-screen tablet-s:pb-6 pb-40 min-h-screen h-[100%] dark:bg-bgblack dark:text-white flex flex-col items-center gap-14 ">
      <div className="flex flex-col items-center w-full mt-28 tablet-s:max-w-[380px] max-w-[300px]">
        <div className="flex flex-col items-start w-full gap-8 px-3 py-6 tracking-wider transition-all duration-200 border-2 hover:shadow-lg hover:dark:shadow-gray-800 hover:shadow-gray-300 tablet-s:p-8 rounded-xl border-bgyellow">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start w-full">
              <p className="text-sm font-bold text-left text-gray-600 dark:text-gray-400">
                Active Subsciptions
              </p>
              <h1 className="mt-4 text-4xl font-bold">{allPost.length}</h1>
            </div>
            <div className="flex flex-col items-end w-full">
              <h3 className="text-sm font-bold text-left text-gray-600 dark:text-gray-400 ">
                Total Spent
              </h3>
              <h1 className="mt-4 text-4xl font-bold">{`₹ ${user?.spent?.toFixed(
                2
              )}`}</h1>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 font-bold ">
            <p className="text-sm font-bold text-left text-gray-600 dark:text-gray-400 ">
              Sort{" "}
            </p>
            <div className="flex justify-start w-full gap-0 border-2 rounded-xl border-bgyellow text-md">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${
                  durationActive && "bg-bgyellow text-bgblack"
                } px-2 py-2 rounded-tl-lg rounded-bl-lg font-semibold tracking-wide w-full`}
                onClick={costClickHandler}
              >
                Cost
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${
                  !durationActive && "bg-bgyellow text-bgblack"
                } px-2  rounded-tr-lg rounded-br-lg font-semibold tracking-wide w-full`}
                onClick={durationClickHandler}
              >
                Remaining Days
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <AddNewSubscription onClick={() => router.push(`/${userId}/new`)} />

      <AnimatePresence>
        {allPost.map((post, i) => {
          return (
            <SingleSubscription index={i} key={post._id} postData={post} />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default AllSubscriptions;
