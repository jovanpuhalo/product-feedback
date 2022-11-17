export const variantsPage = {
  hidden: { x: "100vw" },
  visible: {
    x: "0",
    transition: {
      type: "spring",
      stiffness: 120,
      mass: 0.7,
      duration: 0.8,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      duration: 0.8,
    },
  },
};

export const commentVariants = {
  hidden: {
    opacity: 0,
    y: "-20px",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.7,
    },
  },
  exit: {
    height: 0,
    overflow: "hidden",
    padding: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const commentsVariants = {
  hidden: {},
  visible: {
    height: "fit-content",
    transition: {
      type: "spring",
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,

    transition: {
      duration: 0.7,
    },
  },
};

export const roadMapVariants = {
  hidden: { x: "100vw" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      when: "beforeChildren",
      duration: 0.8,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      duration: 0.9,
    },
  },
};
export const roadMapItemVariants = {
  hidden: { x: "100vw" },
  visible: {
    x: 0,
    transition: {
      type: "spring",

      duration: 0.8,
    },
  },

  exit: {
    x: "-100vw",
    transition: {
      duration: 0.9,
    },
  },
};

export const variantsFeedback = {
  stop: {
    opacity: 1,
    transition: { duration: 1 },
  },
  initial: {
    opacity: 0,
    transition: { duration: 1 },
  },
  in: {
    opacity: 1,
    transition: { type: "spring", duration: 0 },
  },
  out: {
    opacity: 0,
    transition: { type: "spring", duration: 0.5 },
  },
};
