import { getUser, signIn, signUp, signOutUser, initDeleteFeedbacks } from "../../firebase/firebase";
import { authActions } from "./auth-slice";

export const createUser = (data) => {
  return async (dispatch) => {
    dispatch(authActions.setIsLoading(true));
    try {
      await signUp(data);

      dispatch(authActions.createUser());
    } catch (error) {
      console.log(error.message);
      dispatch(authActions.setError(error.message));
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(authActions.setIsLoading(true));
    try {
      const res = await signIn(email, password);
      await initDeleteFeedbacks();
      if (res) {
        const user = await getUser(res.uid);
        const data = {
          token: res.accessToken,
          userId: res.uid,
          ...user,
        };
        dispatch(authActions.userLogin(data));
        dispatch(authActions.setIsLoading(false));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(authActions.setError(error.message));
    }
  };
};
export const getCurrentSignInUser = (uid) => {
  return async (dispatch) => {
    const user = await getUser(uid);

    const data = {
      userId: uid,
      ...user,
    };
    dispatch(authActions.userLogin(data));
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await signOutUser();
      dispatch(authActions.userLogOut());
    } catch (error) {
      console.log(error.message);
    }
  };
};
