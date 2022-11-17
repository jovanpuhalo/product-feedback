import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./sass/main.scss";
import { fetchSuggestions } from "./store/suggestions-slice-actions/suggestio-actions";
import { getCurrentSignInUser } from "./store/auth-slice-actions/auth-actions";
import { authActions } from "./store/auth-slice-actions/auth-slice";
import { uiActions } from "./store/ui-slice/ui-slice";
import { AnimatePresence } from "framer-motion";
import HomePage from "./Pages/HomePage";
import AddFeedbakcPage from "./Pages/AddFeedbakcPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import EditFeedbakcPage from "./Pages/EdditFeedbackPage";
import FeedbackDetailPage from "./Pages/FeedbackDetailPage";
import RoadmapPage from "./Pages/RoadmapPage";
import Modal from "./components/ui/Modal/Modal";
import UserVotes from "./components/UserVotes/UserVotes";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const modalIsOpen = useSelector((state) => state.uiReducer.modalIsOpen);
  const modalMessage = useSelector((state) => state.uiReducer.modalMessage);

  const closeModalHandler = () => {
    dispatch(uiActions.setModalIsOpen(false));
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) dispatch(getCurrentSignInUser(userId));
    dispatch(fetchSuggestions());

    return () => {
      localStorage.removeItem("feedbackId");
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(uiActions.setModalIsOpen(false));
    dispatch(authActions.setError(""));
  }, [dispatch, location]);

  return (
    <Fragment>
      <ToastContainer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<HomePage />} />
          <Route path="/addFeedback" element={<AddFeedbakcPage />} />
          <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
          <Route path="/feedback/:id/edit" element={<EditFeedbakcPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          {/* <Route path="/auth/login" element={!isUserLoggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path="/auth/signup" element={!isUserLoggedIn ? <Signup /> : <Navigate to="/" />} /> */}
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/your-votes" element={<UserVotes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      {modalIsOpen && (
        <Modal onClose={closeModalHandler} className="info-modal">
          {modalMessage}
        </Modal>
      )}
    </Fragment>
  );
}

export default App;
