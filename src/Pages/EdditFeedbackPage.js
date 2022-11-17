import React from "react";
import EditFeedback from "../components/EditFeedback/EditFeedback";
import GoBack from "../components/ui/GoBack/GoBack";
import { variantsPage } from "../helper/variants";
import { motion } from "framer-motion";
import ScrollToTop from "../helper/ScrollToTop";

const EditFeedbakcPage = () => {
  return (
    <motion.div className="add-feedback-layout" variants={variantsPage} initial="hidden" animate="visible" exit="exit">
      <GoBack />
      <ScrollToTop />
      <EditFeedback />
    </motion.div>
  );
};

export default EditFeedbakcPage;
