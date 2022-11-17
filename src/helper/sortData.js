export const sortData = (array, option, criterium) => {
  return array.sort((itemA, itemB) => {
    if (option === "asc") {
      if (criterium === "createdAt") {
        return new Date(itemA.createdAt) < new Date(itemB.createdAt) ? 1 : -1;
      }
      if (criterium === "comments") {
        return itemA.comments.length < itemB.comments.length ? 1 : -1;
      }
      return itemA[criterium] < itemB[criterium] ? 1 : -1;
    } else {
      if (criterium === "createdAt") {
        return new Date(itemA.createdAt) > new Date(itemB.createdAt) ? 1 : -1;
      }
      if (criterium === "comments") {
        return itemA.comments.length > itemB.comments.length ? 1 : -1;
      }
      return itemA[criterium] > itemB[criterium] ? 1 : -1;
    }
  });
};
