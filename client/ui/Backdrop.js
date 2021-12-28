import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariant = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Backdrop = ({ showBackdrop, setShowBackdrop }) => {
  return (
    <AnimatePresence>
      {showBackdrop && (
        <motion.div
          className="fixed top-0 left-0 z-10 w-screen h-screen bg-gray-900/50"
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
        ></motion.div>
      )}
    </AnimatePresence>
  );
};

export default Backdrop;
