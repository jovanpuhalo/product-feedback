import { useEffect } from "react";
import { Routes, Route } from "react-router";
import "./sass/main.scss";
import { fetchSuggestions } from "./store/suggestions-slice-actions/suggestio-actions";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./store/user-slice-actions/user-actions";
import HomePage from "./Pages/HomePage";
import AddFeedbakcPage from "./Pages/AddFeedbakcPage";
import FeedbackDetail from "./components/FeedbackDetail/FeedbackDetail";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { getCurrentSignInUser } from "./store/auth-slice-actions/auth-actions";

function App() {
  console.log("APP");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("APP useeffect");

    dispatch(fetchSuggestions());
    dispatch(fetchUsers());
    dispatch(getCurrentSignInUser());
    return () => {
      localStorage.removeItem("feedbackId");
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addFeedback" element={<AddFeedbakcPage />} />
      <Route path="/feedback/:id" element={<FeedbackDetail />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
