import React, { useEffect, useState } from "react";
import AddNewSubscription from "../../../components/AllSubscriptions/AddNewSubscription";
import SingleSubscription from "../../../components/AllSubscriptions/SingleSubscription";
import TopInfo from "../../../components/AllSubscriptions/TopInfo";
import { useGlobalAuthContext } from "../../../AuthContext";
import { useRouter } from "next/router";
import { getPostByUserId } from "../../../functions/auth";
const AllSubscriptions = () => {
  const [allPost, setAllPost] = useState([]);
  const router = useRouter();
  const { isLoading, token, userId } = useGlobalAuthContext();

  useEffect(() => {
    if (!isLoading && !token) router.replace("/");
    if (!isLoading && token) {
      const getAllPost = async () => {
        const allPost = await getPostByUserId(userId);

        setAllPost(allPost.data.posts);
        // console.log(allPost.data);
      };

      getAllPost();
    }
  }, [isLoading, token]);

  return (
    <div className="w-screen tablet-s:pb-6 pb-14 min-h-screen h-100% dark:bg-bgblack dark:text-white flex flex-col items-center gap-14">
      <TopInfo />
      {allPost.map((post) => {
        return <SingleSubscription key={post._id} postData={post} />;
      })}
      {/* <AddNewSubscription />
      <SingleSubscription />
      <SingleSubscription />
      <SingleSubscription /> */}
    </div>
  );
};

export default AllSubscriptions;
