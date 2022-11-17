import React from "react";
import { motion } from "framer-motion";
import { variantsPage } from "../../../helper/variants";

const HomeGridLayout = (props) => {
  return (
    <motion.div variants={variantsPage} initial="hidden" animate="visible" exit="exit" className="grid-layout">
      {props.children}
    </motion.div>
  );
};

export default HomeGridLayout;
