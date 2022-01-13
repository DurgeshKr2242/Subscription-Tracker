import React, { useEffect, useState } from "react";
import { useGlobalAuthContext } from "../../AuthContext";
import SingleFriend from "./SingleFriend";

const FriendsSection = () => {
  const totalFriends = 12;
  const [friends, setFriends] = useState([]);

  const { user } = useGlobalAuthContext();

  useEffect(() => {
    setFriends(user?.friends);
    console.log(friends);
  }, [user, friends]);

  return (
    <div className="w-full max-w-3xl px-2 mt-8">
      <div className="flex items-center justify-start w-full gap-4 mb-12">
        <div className="dark:bg-gray-900 bg-bgWhiteSec inline w-[10%] h-1"></div>
        <p className="flex items-center text-xl tracking-wide text-yellow-600 dark:text-bgyellow">
          Friends <span className="px-4 text-4xl font-extrabold">/</span>{" "}
          {totalFriends}
        </p>
        <div className="w-full h-1 dark:bg-gray-900 bg-bgWhiteSec "></div>
      </div>

      {friends?.map((friend, i) => {
        return <SingleFriend key={i} pfp={friend.picture} name={friend.name} />;
      })}
    </div>
  );
};

export default FriendsSection;
