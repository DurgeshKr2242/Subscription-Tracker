import { motion } from "framer-motion";
import React, { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import NewSubscriptionForm from "./NewSubscriptionForm";

const AddNewSubscription = () => {
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const bg = {
    overlay: {
      background: "rgba(8, 8, 8, 0.93)",
    },
    modal: {
      padding: "7px",
      paddingTop: "15px",
      background: "#f2f2f2",
      borderRadius: "5%",
      boxShadow: "0px 0px 30px 6px rgba(94,94,94,0.75)",
    },
  };

  return (
    <div className="flex flex-col items-center ">
      <motion.button
        onClick={onOpenModal}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center gap-2 px-4 py-2 font-bold tracking-wide rounded-lg shadow-md shadow-yellow-800 bg-bgyellow text-bgblack"
      >
        Add Subscription
        <RiAddCircleFill />
      </motion.button>
      <Modal
        closeIcon={null}
        styles={bg}
        open={openModal}
        onClose={onCloseModal}
        center
      >
        <NewSubscriptionForm />
      </Modal>
    </div>
  );
};

export default AddNewSubscription;
