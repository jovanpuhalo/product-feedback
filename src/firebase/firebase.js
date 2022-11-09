import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  // getDocs,
  addDoc,
  serverTimestamp,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  increment,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
initializeApp(firebaseConfig);

const db = getFirestore();

const colSuggestionsRef = collection(db, "suggestions");
// const colInitRef = collection(db, "init");

const auth = getAuth();
const user = auth.currentUser;

// export const getSuggestions = async () => {
//   let suggestions = [];
//   onSnapshot(colSuggestionsRef, (snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       const date = doc.data().createdAt.toDate().toString();
//       suggestions.push({ ...doc.data(), id: doc.id, createdAt: date });
//     });
//     console.log("ssssssssssssssssssss", suggestions);
//     return suggestions;
//   });

//   // const suggestionsData = getDocs(colSuggestionsRef)
//   //   .then((snapshot) => {
//   //     let suggestions = [];
//   //     snapshot.docs.forEach((doc) => {
//   //       const date = doc.data().createdAt.toDate().toString();
//   //       suggestions.push({ ...doc.data(), id: doc.id, createdAt: date });
//   //     });
//   //     return suggestions;
//   //   })
//   //   .catch((err) => {});

//   // return suggestionsData;
// };

export const getSuggestions = (dispatch) =>
  onSnapshot(colSuggestionsRef, (snapshot) => {
    let suggestions = [];
    snapshot.docs.forEach((doc) => {
      if (doc.data().createdAt) {
        const date = doc.data().createdAt.toDate().toString();
        suggestions.push({ ...doc.data(), id: doc.id, createdAt: date });
      }
    });
    console.log("ffffffffffffffffffffffffffffffff", suggestions);
    dispatch(suggestions);
  });

export const getInitDeleteId = async () => {
  const initDeleteData = await getDoc(doc(db, "init", "start state"));
  console.log("initData", initDeleteData.data());
  initDeleteData.data().feedbacks.map((id) => deleteFeedback(id));
  // initDeleteData.data().users.map((id) => deleteFeedback(id));
};

export const getUser = async (userId) => {
  try {
    const userData = await getDoc(doc(db, "users", userId));
    // console.log("Stampam sve zivo i nezivo", userData);
    // console.log("userData.data()", userData.data());
    // console.log("userData.data().createdAt", userData.data().createdAt);
    // console.log("userData.data().createdAt.toDate()", userData.data().createdAt.toDate());
    const date = userData.data().createdAt.toDate().toString();

    if (userData.exists()) {
      return { ...userData.data(), createdAt: date };
    }
  } catch (error) {
    // throw new Error(error.message);
  }
};
export const addUser = async (data, userId) => {
  try {
    await setDoc(doc(db, "users", userId), { createdAt: serverTimestamp(), ...data });
    //setDoc ne vraca nista posle uspjesnog upisivanja dokumenta
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addUserInit = async (id) => {
  const docRef = doc(db, "init", "start state");
  await updateDoc(docRef, { users: arrayUnion(id) });
};

export const updateUser = async (userId, data) => {
  const docRef = doc(db, "users", userId);
  try {
    await updateDoc(docRef, data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addFeedback = (data) => {
  const suggestionData = addDoc(colSuggestionsRef, {
    createdAt: serverTimestamp(),
    ...data,
  });
  // console.log(data);
  // const docRef = doc(db, "init", "start state");
  // updateDoc(docRef, { "feedbacks": arrayUnion(data.id) });
  return suggestionData;
};

export const addFeedbackInit = async (id) => {
  const docRef = doc(db, "init", "start state");
  await updateDoc(docRef, { feedbacks: arrayUnion(id) });
};

export const deleteFeedback = async (id) => {
  const docRef = doc(db, "suggestions", id);
  await deleteDoc(docRef);

  await updateDoc(doc(db, "init", "start state"), {
    feedbacks: arrayRemove(id),
  });
};

export const getFeedback = async (feedbackId) => {
  try {
    const feedbackData = await getDoc(doc(db, "suggestions", feedbackId));
    const date = feedbackData.data().createdAt.toDate().toString();
    if (feedbackData.exists()) {
      return { ...feedbackData.data(), createdAt: date, id: feedbackData.id };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addComment = async (feedbackId, data) => {
  try {
    await updateDoc(doc(db, "suggestions", feedbackId), {
      comments: arrayUnion(data),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
export const removeComment = async (feedbackId, data) => {
  try {
    await updateDoc(doc(db, "suggestions", feedbackId), {
      comments: arrayRemove(data),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateFeedback = async (id, data) => {
  const docRef = doc(db, "suggestions", id);
  await updateDoc(docRef, data);
};

export const updateFeedbackVote = async (method, id) => {
  const docRef = doc(db, "suggestions", id);
  if (method === "increment") {
    await updateDoc(docRef, { upVotes: increment(1) });
  } else {
    await updateDoc(docRef, { upVotes: increment(-1) });
  }
};

export const updateComment = async (data) => {
  const docRef = doc(db, "suggestions", data.feedbackId);
  try {
    await updateDoc(docRef, {
      comments: data.commentData,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signIn = async (email, password) => {
  let cred;
  try {
    cred = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }
  return cred.user;
};

export const currentSignInUser = (dispatch) => {
  onAuthStateChanged(getAuth(), async (user) => {
    if (user) {
      dispatch(user);
    } else {
      await getInitDeleteId();
    }
  });
};

export const signOutUser = async () => {
  try {
    const res = await signOut(auth);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = async (email, password) => {
  let user;
  try {
    user = await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }

  return user;
};

export const deleteUSER = () => {
  deleteUser(user)
    .then(() => {
      console.log(user);
    })
    .catch((error) => {});
};
