import React, { useState } from "react";
import GoBack from "../ui/GoBack/GoBack";
import Button from "../ui/Buttons/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FeedbackRoadmap from "../FeedbackRoadmap/FeedbackRoadmap";
import useWindowSize from "../../hooks/useWindowWidth";

const Roadmap = () => {
  const navigate = useNavigate();
  const width = useWindowSize();
  const [activeTab, setActiveTab] = useState("planned");

  const filteredSuggestions = useSelector((state) => state.suggestionsReducer.filteredSuggestions);
  const planned = filteredSuggestions.filter((item) => item.status === "Planned");
  const inProgress = filteredSuggestions.filter((item) => item.status === "In-progress");
  const live = filteredSuggestions.filter((item) => item.status === "Live");

  const plannedFeedbacks = planned.map((item, index) => (
    <FeedbackRoadmap key={index} item={item} clickable className="Planned" />
  ));
  const inProgressFeedback = inProgress.map((item, index) => (
    <FeedbackRoadmap key={index} item={item} clickable className="In-progress" />
  ));
  const liveFeedback = live.map((item, index) => (
    <FeedbackRoadmap key={index} item={item} clickable className="Live" />
  ));

  const onClickHandler = () => {
    navigate("/addFeedback");
  };
  const tabActiveHandler = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="roadmap-layout">
      <div className="roadmap-header">
        <div className="roadmap-header__title">
          <GoBack className="goback-roadmap" />
          <div>Roadmap</div>
        </div>
        <Button onClick={onClickHandler}>+ Add Feedback</Button>
      </div>

      <div className="roadmap-category">
        Planned ({plannedFeedbacks.length}) <span>Ideas priortized for research</span>
      </div>
      <div className="roadmap-category">
        In-Progress ({inProgressFeedback.length})<span>Currently being developed</span>
      </div>
      <div className="roadmap-category">
        Live ({liveFeedback.length})<span>Released features</span>
      </div>

      <div className="roadmap-column">{plannedFeedbacks}</div>
      <div className="roadmap-column">{inProgressFeedback}</div>
      <div className="roadmap-column">{liveFeedback}</div>

      {width < 786 && (
        <>
          <ul className="roadmap__mobile-menu">
            <li onClick={() => tabActiveHandler("planned")}>
              Planned <div className={`roadmap__mobile-menu__${activeTab}`}></div>
            </li>
            <li onClick={() => tabActiveHandler("in-progress")}>In-Progress </li>
            <li onClick={() => tabActiveHandler("live")}>Live </li>
          </ul>

          <div className={`roadmap-category  ${activeTab === "planned" ? "roadmap--planned" : ""}`}>
            Planned ({plannedFeedbacks.length}) <span>Ideas priortized for research</span>
          </div>
          <div className={`roadmap-category  ${activeTab === "in-progress" ? "roadmap--in-progress" : ""}`}>
            In-Progress ({inProgressFeedback.length})<span>Currently being developed</span>
          </div>
          <div className={`roadmap-category  ${activeTab === "live" ? "roadmap--live" : ""}`}>
            Live ({liveFeedback.length})<span>Released features</span>
          </div>

          <div className={`roadmap-column  ${activeTab === "planned" ? "roadmap-column--mobile" : ""}`}>
            {plannedFeedbacks}
          </div>
          <div className={`roadmap-column  ${activeTab === "in-progress" ? "roadmap-column--mobile" : ""}`}>
            {inProgressFeedback}
          </div>
          <div className={`roadmap-column  ${activeTab === "live" ? "roadmap-column--mobile" : ""}`}>
            {liveFeedback}
          </div>
        </>
      )}
    </div>
  );
};

export default Roadmap;
