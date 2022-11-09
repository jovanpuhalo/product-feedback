import { suggestionActions } from "./suggestion-slice";
import {
  getSuggestions,
  addFeedback,
  updateFeedback,
  getFeedback,
  addComment,
  removeComment,
  updateComment,
  deleteFeedback,
  updateFeedbackVote,
  addFeedbackInit,
  getInitDeleteId,
} from "../../firebase/firebase";

export const initDelete = async () => {
  try {
    // dispatch(suggestionActions.setFeedbackIsFetching(true));
    await getInitDeleteId();
    // dispatch(suggestionActions.initSuggestions(res));
    // dispatch(suggestionActions.setFeedbackIsFetching(false));
  } catch (error) {
    // dispatch(suggestionActions.setFeedbackIsFetching(false));

    console.log(error);
  }
};

export const fetchSuggestions = () => {
  return async (dispatch) => {
    try {
      dispatch(suggestionActions.setFeedbackIsFetching(true));
      getSuggestions((res) => {
        dispatch(suggestionActions.initSuggestions(res));
      });

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
      // const resGetFeedback = await getFeedback(resAddFeedback.id);
      await addFeedbackInit(resAddFeedback.id); //dodavanje id-ija u initijalni dokument u firestore(zbog resetovanja podataka)

      // dispatch(suggestionActions.addFeedback(resGetFeedback));
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
export const fetchUpdateFeedback = (data) => {
  return async (dispatch) => {
    try {
      dispatch(suggestionActions.setFeedbackIsUpdating(true)); //1
      const { createdAt, ...rest } = data; //createdAt is string. firestore createdAt is timestamp
      await updateFeedback(data.id, rest); //2 wait

      dispatch(suggestionActions.updateFeedback({ message: "Update feedback", data })); //3
      // dispatch(suggestionActions.setOpenedFeedback(data)); //3

      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
    } catch (error) {
      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
      console.log(error);
    }
  };
};

export const fetchUpdateFeedbackVotes = (method, data) => {
  return async (dispatch) => {
    try {
      dispatch(suggestionActions.setFeedbackIsUpdating(true)); //1
      console.log("dispatchujem", data.id);
      await updateFeedbackVote(method, data.id); //2 wait

      dispatch(suggestionActions.updateFeedback({ message: "voted", data })); //3
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
        await removeComment(data.feedbackId, data.commentData);
      }
      if (data.method === "update") {
        await updateComment(data);
      }
      if (data.method === "add reply") {
        await updateComment(data);
      }
      if (data.method === "delete reply") {
        await updateComment(data);
      }

      dispatch(suggestionActions.updateFeedbackComments({ openedFeedback, method: data.method })); //3
      dispatch(suggestionActions.setOpenedFeedback(openedFeedback)); //3

      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
    } catch (error) {
      dispatch(suggestionActions.setFeedbackIsUpdating(false)); //3
      console.log(error);
    }
  };
};
