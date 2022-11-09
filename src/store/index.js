import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice-actions/auth-slice";
import suggestionsSlice from "./suggestions-slice-actions/suggestion-slice";
import uiSlice from "./ui-slice/ui-slice";
import userSlice from "./user-slice-actions/user-slice";

const store = configureStore({
  reducer: {
    suggestionsReducer: suggestionsSlice.reducer,
    userReducer: userSlice.reducer,
    authReducer: authSlice.reducer,
    uiReducer: uiSlice.reducer,
  },
});

export default store;
