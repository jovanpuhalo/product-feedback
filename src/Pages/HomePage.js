import React from "react";
import FeedbackFilter from "../components/FedbackFilter/FeedbackFilter";
import FeedbackBoard from "../components/FeedbackBoard/FeedbackBoard";
import HomeGridLayout from "../components/layouts/HomeGridLayout/HomeGridLayout";
import LoginButton from "../components/LoginButton/LoginButton";
import Roadmap from "../components/Roadmap/Roadmap";
import Suggestions from "../components/Suggestions/Suggestions";
import SuggestionsHeader from "../components/SuggestionsHeader/SuggestionsHeader";

const HomePage = () => {
  return (
    <HomeGridLayout>
      <LoginButton />
      <SuggestionsHeader />
      <FeedbackBoard />
      <Suggestions />
      <FeedbackFilter />
      <Roadmap />
    </HomeGridLayout>
  );
};

export default HomePage;
