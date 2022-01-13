import React, { useEffect, useState } from "react";
import AddNewSubscription from "../../../components/AllSubscriptions/AddNewSubscription";
import SingleSubscription from "../../../components/AllSubscriptions/SingleSubscription";
import TopInfo from "../../../components/AllSubscriptions/TopInfo";
import { useGlobalAuthContext } from "../../../AuthContext";
import { useRouter } from "next/router";
import { getPostByUserId } from "../../../functions/auth";
import { motion, AnimatePresence } from "framer-motion";

const AllSubscriptions = () => {
  const [durationActive, setDurationActive] = useState(true);
  const [allPost, setAllPost] = useState([]);
  const router = useRouter();
  const { isLoading, token, userId } = useGlobalAuthContext();
  // const [showPost, setShowPost] = useState();
  // const [sortBy, setSortBy] = useState("");

  // useEffect(() => {
  //   if (durationActive) {
  //     console.log("sorted by duration");
  //     const sortedByDurationPosts = allPost.sort(
  //       (a, b) => a.duration - b.duration
  //     );
  //     console.log(sortedByDurationPosts);
  //     setShowPost(sortedByDurationPosts);
  //     // console.log(allPost);
  //   }
  //   if (!durationActive) {
  //     console.log("sorted by cost");
  //     const sortedByCostPosts = allPost.sort((a, b) => a.cost - b.cost);
  //     console.log(sortedByCostPosts);
  //     setShowPost(sortedByCostPosts);
  //   }
  //   // allPost.sort(dynamicSort(sortBy));
  // }, [durationActive, allPost, showPost]);

  // const sortHandler = (sortBy) => {
  //   setSortBy(sortBy);
  // };

  useEffect(() => {
    if (!isLoading && !token) router.replace("/");
    if (!isLoading && token) {
      const getAllPost = async () => {
        const allPost = await getPostByUserId(userId);

        setAllPost(allPost.data.posts);
        console.log(allPost.data.posts);
      };

      getAllPost();
      // if (durationActive) {
      //   console.log("sorted by duration");
      //   allPost.sort((a, b) => {
      //     return a.duration - b.duration;
      //   });
      //   // console.log(allPost);
      // }
    }
  }, [isLoading, token]);

  return (
    <div className="w-screen tablet-s:pb-6 pb-40 min-h-screen h-[100%] dark:bg-bgblack dark:text-white flex flex-col items-center gap-14 ">
      {/* TOP HANDLER */}

      <TopInfo />

      {/* TOP HANDLER */}

      <AddNewSubscription onClick={() => router.push(`/${userId}/new`)} />

      {allPost.map((post) => {
        return <SingleSubscription key={post._id} postData={post} />;
      })}
    </div>
  );
};

export default AllSubscriptions;
