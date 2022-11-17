import React from "react";
import Feedback from "../Feedback/Feedback";
import { useSelector } from "react-redux";
import EmptySuggestions from "../EmptySuggestions/EmptySuggestions";
import MoonLoader from "react-spinners/MoonLoader";
import { motion, LayoutGroup } from "framer-motion";

const Suggestions = () => {
  const filteredSuggestions = useSelector((state) => state.suggestionsReducer.filteredSuggestions);
  const feedbackIsFetching = useSelector((state) => state.suggestionsReducer.feedbackIsFetching);
  const loading = useSelector((state) => state.suggestionsReducer.loading);

  const suggestions = filteredSuggestions
    .filter((item) => {
      return item.status === "suggestion";
    })
    .map((item, index) => <Feedback key={item.id} item={item} clickable={true} />);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "50rem",
      }}
    >
      {loading && (
        <div style={{ width: "10rem", margin: "3rem auto" }}>
          <MoonLoader loading={loading} size={100} speedMultiplier={1} color="rgb(70, 97, 230)" />
        </div>
      )}
      {feedbackIsFetching ? (
        <div className="spinner-layout">
          <MoonLoader loading={feedbackIsFetching} size={100} speedMultiplier={1} color="rgb(70, 97, 230)" />
        </div>
      ) : (
        <LayoutGroup id="1">
          <motion.ul layout transition={{ duration: 0 }} className="suggestions">
            {filteredSuggestions.length !== 0 ? suggestions : <EmptySuggestions />}
          </motion.ul>
        </LayoutGroup>
      )}
    </div>
  );
};

export default Suggestions;
