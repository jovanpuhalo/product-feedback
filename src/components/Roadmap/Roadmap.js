import React, { useEffect, useState } from "react";
import GoBack from "../ui/GoBack/GoBack";
import Button from "../ui/Buttons/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FeedbackRoadmap from "../FeedbackRoadmap/FeedbackRoadmap";
import useWindowSize from "../../hooks/useWindowWidth";
import { roadMapVariants, variantsPage } from "../../helper/variants";
import { motion, useAnimation } from "framer-motion";
// import { AnimatePresence } from "framer-motion";

const Roadmap = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
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
  const animate = () =>
    controls.start({
      x: 500,
    });
  useEffect(() => {
    controls.start({
      x: 0,
      transition: { delay: 0.9, duration: 1 },
    });

    document.getElementsByTagName("html")[0].style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.getElementsByTagName("html")[0].style.overflowX = "unset";
      document.body.style.overflowX = "unset";
    };
  }, [controls]);

  return (
    <motion.div className="roadmap-layout" variants={variantsPage} initial="hidden" animate="visible" exit="exit">
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

      <motion.div variants={roadMapVariants} className="roadmap-column">
        {plannedFeedbacks}
      </motion.div>
      <motion.div variants={roadMapVariants} className="roadmap-column">
        {inProgressFeedback}
      </motion.div>
      <motion.div variants={roadMapVariants} className="roadmap-column">
        {liveFeedback}
      </motion.div>

      {width < 786 && (
        <motion.div variants={roadMapVariants} style={{ width: "100%" }}>
          <ul className="roadmap__mobile-menu">
            <li
              onClick={() => {
                tabActiveHandler("planned");
                animate();
              }}
            >
              Planned <div className={`roadmap__mobile-menu__${activeTab}`}></div>
            </li>
            <li
              onClick={() => {
                animate();
                tabActiveHandler("in-progress");
              }}
            >
              In-Progress{" "}
            </li>
            <li
              onClick={() => {
                animate();

                tabActiveHandler("live");
              }}
            >
              Live{" "}
            </li>
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

          {activeTab === "planned" && (
            <div className={`roadmap-column  ${activeTab === "planned" ? "roadmap-column--mobile" : ""}`}>
              {plannedFeedbacks}
            </div>
          )}

          {activeTab === "in-progress" && (
            <div className={`roadmap-column  ${activeTab === "in-progress" ? "roadmap-column--mobile" : ""}`}>
              {inProgressFeedback}
            </div>
          )}
          {activeTab === "live" && (
            <div className={`roadmap-column  ${activeTab === "live" ? "roadmap-column--mobile" : ""}`}>
              {liveFeedback}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Roadmap;
