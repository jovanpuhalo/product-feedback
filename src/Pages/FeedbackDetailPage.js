import React, { Fragment } from "react";
import FeedbackDetail from "../components/FeedbackDetail/FeedbackDetail";
import ScrollToTop from "../helper/ScrollToTop";

const FeedbackDetailPage = () => {
  return (
    <Fragment>
      <ScrollToTop />

      <FeedbackDetail />
    </Fragment>
  );
};

export default FeedbackDetailPage;
