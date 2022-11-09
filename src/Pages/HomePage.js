import React from "react";
import FeedbackFilter from "../components/FedbackFilter/FeedbackFilter";
import FeedbackBoard from "../components/FeedbackBoard/FeedbackBoard";
import HomeGridLayout from "../components/layouts/HomeGridLayout/HomeGridLayout";
import LoginButton from "../components/LoginButton/LoginButton";
import Menu from "../components/Menu/Menu";
import MenuButton from "../components/Menu/MenuButton";
import RoadmapView from "../components/Roadmap/RoadmapView";
import Suggestions from "../components/Suggestions/Suggestions";
import SuggestionsHeader from "../components/SuggestionsHeader/SuggestionsHeader";

import useWindowSize from "../hooks/useWindowWidth";

const HomePage = () => {
  const width = useWindowSize();
  return (
    <HomeGridLayout>
      {width > 768 && <LoginButton />}
      <SuggestionsHeader />
      <FeedbackBoard />
      <Suggestions />
      {width > 768 && <FeedbackFilter />}
      {width > 768 && <RoadmapView />}
      <MenuButton />
      <Menu />
    </HomeGridLayout>
  );
};

export default HomePage;
