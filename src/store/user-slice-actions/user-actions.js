import { getUser, updateUser } from "../../firebase/firebase";
import { userActions } from "./user-slice";
import { authActions } from "../auth-slice-actions/auth-slice";

export const fetchGetUser = async (userId) => {
  try {
    const res = await getUser(userId);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateUser = (userId, data) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.setUserIsUpdating(true));
      await updateUser(userId, data);
      dispatch(authActions.updateCurrentUser(data));
      dispatch(userActions.setUserIsUpdating(false));
    } catch (error) {
      console.log(error);
    }
  };
};
