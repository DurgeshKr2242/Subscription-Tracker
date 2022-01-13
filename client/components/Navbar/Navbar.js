import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

import { RiPlayList2Line } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { FaMoneyCheck } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { BsFillUnlockFill } from "react-icons/bs";

import { useGlobalAuthContext } from "../../AuthContext";
import { auth } from "../../firebase";

const Navbar = () => {
  const router = useRouter();
  const { email, setEmail, setToken, token, userId } = useGlobalAuthContext();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      setEmail(null);
      setToken(null);
      console.log("logout!!");
      console.log(email, token);

      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed z-50 bottom-0 tablet-s:top-0 tablet-s:left-0 flex flex-row tablet-s:flex-col justify-center items-center tablet-s:items-center tablet-s:justify-center w-screen tablet-s:h-screen tablet-s:px-2 pb-6 tablet-s:pt-4 bg-white text-bgblack dark:bg-bgblack dark:text-bgyellow tablet-s:max-h-full max-h-[60px] tablet-s:max-w-[72px] tablet-s:shadow-xl tablet-s:shadow-gray-800 drop-shadow-2xl ">
      <ul className="flex flex-row items-end justify-center gap-4 pt-6 tablet-s:gap-4 tablet-s:flex-col tablet-s:items-center tablet-s:justify-start">
        <li>
          <SideBarIcon
            text="Subscriptions"
            icon={<RiPlayList2Line />}
            onClick={() => router.push(`/${userId}/all-subscriptions`)}
          />
        </li>

        <li>
          <SideBarIcon
            text="People"
            icon={<GoPerson />}
            onClick={() => router.push("/people")}
          />
        </li>
        {!token && (
          <li>
            <SideBarIcon
              text="Authenticate"
              icon={<BsFillUnlockFill />}
              onClick={() => router.push("/auth/login")}
            />
          </li>
        )}
        <li>
          <SideBarIcon
            text="Logout"
            icon={<GiExitDoor />}
            onClick={logoutHandler}
          />
        </li>
      </ul>
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip💡", onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      className="sidebarIcon group"
      onClick={onClick}
    >
      {icon}
      <span className="sidebarTooltip group-hover:scale-100">{text}</span>
    </motion.div>
  );
};

export default Navbar;
