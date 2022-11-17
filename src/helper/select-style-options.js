export const optionsAddFeedback = [
  { value: "Feature", label: "Feature" },
  { value: "UI", label: "UI" },
  { value: "UX", label: "UX" },
  { value: "Enhancement", label: "Enhancement" },
  { value: "Bug", label: "Bug" },
];
export const optionsStatusFeedback = [
  { value: "suggestion", label: "Suggestion" },
  { value: "Planned", label: "Planned" },
  { value: "In-progress", label: "In-progress" },
  { value: "Live", label: "Live" },
];

export const optionsSort = [
  { value: "CreatedAt", label: "CreatedAt" },
  { value: "Most Upvotes", label: "Most Upvotes" },
  { value: "Least Upvotes", label: "Least Upvotes" },
  { value: "Most Comments", label: "Most Comments" },
  { value: "Least Comments", label: "Least Comments" },
];

export const customStyles = {
  menuList: (provided, state) => ({
    ...provided,

    padding: "0",
    borderRadius: "0 0 20px 20px",
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: "0 0 20px 20px",
    border: "1px solid rgb(70, 97, 230)",
    borderTop: "none",
    boxShadow: "none",
    translate: "0 -12px",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    ":hover": { color: "rgb(70, 97, 230)" },
    color: "rgb(70, 97, 230)",
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen && "rotate(180deg)",
  }),

  indicatorSeparator: (provided, state) => ({
    //ovim sto je prazno znacid a ponistava podesavanja, jer nismo stavili ...provided
  }),

  option: (provided, state) => {
    let backgroundColor;

    if (state.isSelected) {
      backgroundColor = "rgb(239, 240, 248)";
    }
    if (state.isFocused) {
      backgroundColor = "rgb(239, 240, 248)";
    }

    return {
      ...provided,

      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      fontSize: "16px",
      color: "rgb(100, 113, 150)",
      "&:last-child": {
        border: "none",
      },
      backgroundColor,
    };
  },

  control: (provided, state) => ({
    ...provided,
    boxShadow: "none",
    border: state.isFocused ? "1px solid rgb(70, 97, 230)" : "1px solid transparent",
    "&:hover": {
      border: state.isFocused ? "1px solid rgb(70, 97, 230)" : "1px solid transparent",
    },
    backgroundColor: "rgb(239, 240, 248)",
    fontSize: "15px",
  }),
};

export const sortStyles = {
  ...customStyles,
  control: (provided, state) => ({
    ...provided,
    minWidth: "150px",

    boxShadow: "none",
    border: state.isFocused ? "1px solid transparent" : "1px solid transparent",
    "&:hover": {
      border: state.isFocused ? "1px solid transparent" : "1px solid transparent",
      cursor: "pointer",
    },
    backgroundColor: "transparent",
    fontSize: "15px",
  }),

  menu: (provided, state) => ({
    ...provided,
    borderRadius: "0 0 20px 20px",
    borderTop: "none",
    translate: "0 10px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  menuList: (provided, state) => ({
    ...provided,

    padding: "0",
    borderRadius: "0 0 20px 20px",
  }),

  option: (provided, state) => {
    let backgroundColor;

    if (state.isSelected) {
      backgroundColor = "rgb(239, 240, 248)";
    }
    if (state.isFocused) {
      backgroundColor = "rgb(239, 240, 248)";
    }

    return {
      ...provided,

      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      fontSize: "16px",
      color: "rgb(100, 113, 150)",

      "&:last-child": {
        border: "none",
      },
      backgroundColor,
      cursor: "pointer",

      ":active": { backgroundColor: "rgb(239, 240, 248)" },
    };
  },
};
