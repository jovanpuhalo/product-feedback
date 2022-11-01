import React from "react";
// import Bezze from "../bezze";
import Feedback from "../Feedback/Feedback";
import { useSelector } from "react-redux";
import EmptySuggestions from "../EmptySuggestions/EmptySuggestions";
import MoonLoader from "react-spinners/MoonLoader";

const Suggestions = () => {
  console.log("suggestions se renderuje");
  const filteredSuggestions = useSelector((state) => state.suggestionsReducer.filteredSuggestions);
  const feedbackIsFetching = useSelector((state) => state.suggestionsReducer.feedbackIsFetching);
  const loading = useSelector((state) => state.suggestionsReducer.loading);

  const suggestions = filteredSuggestions.map((item, index) => {
    return <Feedback key={index} item={item} clickable />;
  });

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
        <div className="suggestions">
          {filteredSuggestions.length !== 0 ? suggestions : <EmptySuggestions />}

          {/* <Bezze /> */}
        </div>
      )}
    </div>
  );
};

export default Suggestions;
