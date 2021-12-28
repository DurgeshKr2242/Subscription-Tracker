import { motion } from "framer-motion";
import React, { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import Backdrop from "../../ui/Backdrop";

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const AddNewSubscription = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="flex flex-col items-center mt-12 ">
      {/* <Backdrop showBackdrop={openModal} /> */}
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center gap-2 px-4 py-2 font-bold tracking-wide rounded-lg shadow-md shadow-yellow-800 bg-bgyellow text-bgblack"
      >
        Add Subscription
        <RiAddCircleFill />
      </motion.button>
    </div>
  );
};

export default AddNewSubscription;
