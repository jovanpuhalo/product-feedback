import suggestionsSlice, { suggestionActions } from "./suggestion-slice";
import {
  getSuggestions,
  addFeedback,
  updateFeedback,
  getFeedback,
  addComment,
  removeComment,
  updateComment,
  deleteFeedback,
} from "../../firebase/firebase";

// export const fetchSuggestions = () => {
//   return async (dispatch) => {
//     try {
//       const res = await getSuggestions();
//       dispatch(suggestionActions.initSuggestions(res));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const fetchSuggestions = () => {
  return async (dispatch) => {
    try {
      dispatch(suggestionActions.setFeedbackIsFetching(true));
      const res = await getSuggestions();
      dispatch(suggestionActions.initSuggestions(res));
      dispatch(suggestionActions.setFeedbackIsFetching(false));

      // getSuggestions((data) => dispatch(suggestionActions.initSuggestions(data)));
    } catch (error) {
      dispatch(suggestionActions.setFeedbackIsFetching(false));

      console.log(error);
    }
  };
};

export const fetchAddFeedback = (data) => {
  return async (dispatch) => {
    try {
      dispatch(suggestionActions.setLoading(true));

      const resAddFeedback = await addFeedback(data);
      const resGetFeedback = await getFeedback(resAddFeedback.id);
      console.log("getFeedback", resGetFeedback);
      dispatch(suggestionActions.addFeedback(resGetFeedback));
      dispatch(suggestionActions.setLoading(false));
    } catch (error) {
      dispatch(suggestionActions.setLoading(false));
      console.log(error);
    }
  };
};
export const fetchDeleteFeedback = (id) => {
  return async (dispatch) => {
    dispatch(suggestionActions.setFeedbackIsDeleting(true));

    try {
      await deleteFeedback(id); //ne vraca nista
      localStorage.removeItem("feedbackId");
      dispatch(suggestionActions.setFeedbackIsDeleting(false));

      dispatch(suggestionActions.deleteFeedback(id));
    } catch (error) {
      dispatch(suggestionActions.setFeedbackIsDeleting(false));

      console.log(error);
    }
  };
};

export const fetchGetFeedback = (feedbackId) => {
  return async (dispatch) => {
    dispatch(suggestionActions.setFeedbackIsFetching(true));
    try {
      const res = await getFeedback(feedbackId);
      console.log("res feedback", res);

      dispatch(suggestionActions.setOpenedFeedback(res));
      dispatch(suggestionActions.setFeedbackIsFetching(false));
    } catch (error) {
      dispatch(suggestionActions.setFeedbackIsFetching(false));
      console.log(error.message);
    }
  };
};

export const fetchUpdateFeedbackVotes = (data) => {
  return async (dispatch) => {
    try {
      dispatch(suggestionActions.setFeedbackIsUpdating(true)); //1
      console.log("dispatchujem", data.id);
      await updateFeedback(data.id, { upVotes: data.upVotes }); //2 wait

      dispatch(suggestionActions.updateFeedback(data)); //3
      dispatch(suggestionActions.setOpenedFeedback(data)); //3

      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
    } catch (error) {
      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
      console.log(error);
    }
  };
};

export const fetchUpdateFeedbackComments = (data, openedFeedback) => {
  return async (dispatch) => {
    try {
      dispatch(suggestionActions.setFeedbackIsUpdating(true)); //1
      if (data.method === "add") {
        await addComment(data.feedbackId, data.commentData);
      }
      if (data.method === "remove") {
        console.log(data.commentData);

        await removeComment(data.feedbackId, data.commentData);
      }
      if (data.method === "update") {
        console.log("Updateujem", data.commentData);

        await updateComment(data);
      }

      dispatch(suggestionActions.updateFeedbackComments(openedFeedback)); //3
      dispatch(suggestionActions.setOpenedFeedback(openedFeedback)); //3

      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
    } catch (error) {
      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
      console.log(error);
    }
  };
};

export const fetchUpdateFeedbackCommentReply = (data) => {
  return async (dispatch) => {
    try {
      dispatch(suggestionActions.setFeedbackIsUpdating(true)); //1
      // if (data.method === "add") {
      //   await addComment(data.feedbackId, data.commentData);
      // }
      // if (data.method === "remove") {
      //   console.log(data.commentData);

      //   await removeComment(data.feedbackId, data.commentData);
      // }

      dispatch(suggestionActions.updateFeedbackCommentReplay(data)); //3
      // dispatch(suggestionActions.setOpenedFeedback(openedFeedback)); //3

      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
    } catch (error) {
      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
      console.log(error);
    }
  };
};
