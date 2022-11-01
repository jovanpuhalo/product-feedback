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

// export const sortData = (data, option) => {
//   return data.sort((userA, userB) => {
//     switch (option) {
//       case "name-asc":
//         return userA.firstName > userB.firstName ? 1 : -1;
//       case "name-desc":
//         return userA.firstName < userB.firstName ? 1 : -1;

//       case "createdAt-asc":
//         return userA.createdAt > userB.createdAt ? 1 : -1;

//       case "createdAt-desc":
//         return userA.createdAt < userB.createdAt ? 1 : -1;

//       default:
//         return null;
//     }
//   });
// };

// const sortedSuggestions = (suggestions, ascending) => {
//   return suggestions.sort((suggA, suggB) => {
//     if (ascending === "asc") {
//       return suggA.createdAt > suggB.createdAt ? 1 : -1;
//     } else {
//       return suggA.createdAt < suggB.createdAt ? 1 : -1;
//     }
//   });
// };
