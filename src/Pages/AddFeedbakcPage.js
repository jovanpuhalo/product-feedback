import React from "react";
import AddFeedback from "../components/AddFeedback/AddFeedback";
import GoBack from "../components/ui/GoBack/GoBack";
import { variantsPage } from "../helper/variants";
import { motion } from "framer-motion";
import ScrollToTop from "../helper/ScrollToTop";

const AddFeedbakcPage = () => {
  return (
    <motion.div className="add-feedback-layout" variants={variantsPage} initial="hidden" animate="visible" exit="exit">
      <ScrollToTop />
      <GoBack />
      <AddFeedback />
    </motion.div>
  );
};

export default AddFeedbakcPage;
