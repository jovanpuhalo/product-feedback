import React from "react";
import EditFeedback from "../components/EditFeedback/EditFeedback";
import GoBack from "../components/ui/GoBack/GoBack";

const EditFeedbakcPage = () => {
  return (
    <div className="add-feedback-layout">
      <GoBack />
      <EditFeedback />
    </div>
  );
};

export default EditFeedbakcPage;
