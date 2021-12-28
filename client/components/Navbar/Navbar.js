import React from "react";

import { RiPlayList2Line } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { FaMoneyCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 tablet-s:top-0 tablet-s:left-0 flex flex-row tablet-s:flex-col justify-center items-center tablet-s:items-center tablet-s:justify-center w-screen tablet-s:h-screen tablet-s:px-2 pb-6 tablet-s:pt-4 bg-white text-bgblack dark:bg-bgblack dark:text-bgyellow tablet-s:max-h-full max-h-[60px] tablet-s:max-w-[72px] tablet-s:shadow-xl tablet-s:shadow-gray-800 drop-shadow-2xl ">
      <ul className="flex flex-row items-end justify-center gap-4 pt-6 tablet-s:gap-4 tablet-s:flex-col tablet-s:items-center tablet-s:justify-start">
        <li>
          <SideBarIcon text="Subscriptions" icon={<RiPlayList2Line />} />
        </li>
        <li>
          <SideBarIcon text="Money" icon={<FaMoneyCheck />} />
        </li>
        <li>
          <SideBarIcon text="People" icon={<GoPerson />} />
        </li>
        <li>
          <SideBarIcon text="Annonymous" icon={<RiPlayList2Line />} />
        </li>
      </ul>
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip💡" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      className="sidebarIcon group"
    >
      {icon}
      <span className="sidebarTooltip group-hover:scale-100">{text}</span>
    </motion.div>
  );
};

export default Navbar;
