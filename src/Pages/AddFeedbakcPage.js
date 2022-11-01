import React from "react";
import AddFeedback from "../components/AddFeedback/AddFeedback";
import GoBack from "../components/ui/GoBack/GoBack";

const AddFeedbakcPage = () => {
  return (
    <div className="add-feedback-layout">
      <GoBack />
      <AddFeedback />
    </div>
  );
};

export default AddFeedbakcPage;
