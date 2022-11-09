import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { options } from "../../helper/ToastifyOptions";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isUserLoggedIn: false,
    token: "",
    currentUser: {},
    error: "",
    isLoading: false,
    userIsCreated: false,
  },

  reducers: {
    createUser(state) {
      state.error = "";
      state.isLoading = false;
      state.userIsCreated = true;
      toast.success(`User is created.`, { ...options });
    },

    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
      state.userIsCreated = false;
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
      state.userIsCreated = false;
    },

    userLogin(state, action) {
      state.isUserLoggedIn = true;
      state.currentUser = { ...action.payload };
      state.isLoading = false;
    },
    userLogOut(state) {
      state.isUserLoggedIn = false;
      state.currentUser = {};
      state.isLoading = false;
      localStorage.removeItem("loggedUser");
      toast.success(`You are successfully logged out.`, { ...options });
    },
    updateCurrentUser(state, action) {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
