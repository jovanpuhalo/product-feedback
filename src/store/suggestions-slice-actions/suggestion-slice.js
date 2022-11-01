import { createSlice } from "@reduxjs/toolkit";
import { sortData } from "../../helper/sortData";

const suggestionsSlice = createSlice({
  name: "suggestioSlice",
  initialState: {
    loading: false,
    feedbackIsDeleting: false,
    feedbackIsUpdating: false,
    feedbackIsFetching: false,
    openedFeedback: {},
    suggestions: [],
    filteredSuggestions: [],
    // numberOfilteredSuggestions: 0,
    filter: "All",
    sortOption: { order: "asc", criteria: "createdAt" },
  },
  reducers: {
    initSuggestions(state, action) {
      const sortedData = sortData(action.payload, "asc", "createdAt");
      state.suggestions = [...sortedData];
      state.filteredSuggestions = [...sortedData];
      // console.log("initialni", state.suggestions);
    },

    addFeedback(state, action) {
      state.filter = "All";
      state.suggestions = [action.payload, ...state.suggestions];
      state.filteredSuggestions = [...state.suggestions];
    },
    deleteFeedback(state, action) {
      state.suggestions = [...state.suggestions.filter((item) => item.id !== action.payload)];
      state.filteredSuggestions = [...state.suggestions];
    },

    updateFeedback(state, action) {
      const feedback = { ...action.payload };
      state.suggestions = [...state.suggestions.filter((item) => item.id !== feedback.id), feedback];
      const sortedData = sortData(state.suggestions, "asc", "createdAt");
      state.suggestions = [...sortedData];
      state.filteredSuggestions = [...state.suggestions];
    },

    updateFeedbackComments(state, action) {
      state.suggestions = [...state.suggestions.filter((item) => item.id !== action.payload.id), action.payload];
      const sortedData = sortData(state.suggestions, "asc", "createdAt");
      state.suggestions = [...sortedData];
      state.filteredSuggestions = [...state.suggestions];
    },

    setFilter(state, action) {
      state.filter = action.payload;
      if (action.payload === "All") {
        state.filteredSuggestions = sortData([...state.suggestions], state.sortOption.order, state.sortOption.criteria);
        return;
      }
      state.filteredSuggestions = sortData(
        state.suggestions.filter((item) => {
          return item.category === action.payload;
        }),
        state.sortOption.order,
        state.sortOption.criteria
      );
    },
    sortSuggestions(state, action) {
      state.sortOption = action.payload;
      let data;
      switch (action.payload) {
        case "Most Upvotes":
          state.sortOption = { order: "asc", criteria: "upVotes" };
          data = sortData(state.filteredSuggestions, "asc", "upVotes");
          state.filteredSuggestions = [...data];
          break;

        case "Least Upvotes":
          state.sortOption = { order: "desc", criteria: "upVotes" };
          data = sortData(state.filteredSuggestions, "desc", "upVotes");
          state.filteredSuggestions = [...data];
          break;
        case "Most Comments":
          state.sortOption = { order: "asc", criteria: "comments" };
          data = sortData(state.filteredSuggestions, "asc", "comments");
          state.filteredSuggestions = [...data];
          break;
        case "Least Comments":
          state.sortOption = { order: "desc", criteria: "comments" };
          data = sortData(state.filteredSuggestions, "desc", "comments");
          state.filteredSuggestions = [...data];
          break;
        case "CreatedAt":
          state.sortOption = { order: "asc", criteria: "createdAt" };
          data = sortData(state.filteredSuggestions, "asc", "createdAt");
          state.filteredSuggestions = [...data];
          break;
        default:
          return;
      }
    },

    setFeedbackIsUpdating(state, action) {
      state.feedbackIsUpdating = action.payload;
    },
    setFeedbackIsFetching(state, action) {
      state.feedbackIsFetching = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setFeedbackIsDeleting(state, action) {
      state.feedbackIsDeleting = action.payload;
    },

    setOpenedFeedback(state, action) {
      state.openedFeedback = action.payload;
    },
    setNumberOfFilteredSuggestions(state, action) {
      state.numberOfilteredSuggestions = action.payload;
    },
  },
});
export const suggestionActions = suggestionsSlice.actions;
export default suggestionsSlice;
