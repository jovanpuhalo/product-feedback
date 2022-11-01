import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
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
const colUsersRef = collection(db, "users");

const auth = getAuth();
const user = auth.currentUser;

export const getSuggestions = () => {
  const suggestionsData = getDocs(colSuggestionsRef)
    .then((snapshot) => {
      let suggestions = [];
      snapshot.docs.forEach((doc) => {
        const date = doc.data().createdAt.toDate().toString();
        suggestions.push({ ...doc.data(), id: doc.id, createdAt: date });
      });
      return suggestions;
    })
    .catch((err) => {
      console.log(err.message);
    });

  return suggestionsData;
};

// export const getSuggestions = (dispatch) =>
//   onSnapshot(colSuggestionsRef, (snapshot) => {
//     console.log("desila se promena");
//     let suggestions = [];
//     snapshot.docs.forEach((doc) => {
//       if (doc.data()) {
//         const date = doc.data().createdAt.toDate().toString();
//         suggestions.push({ ...doc.data(), id: doc.id, createdAt: date });
//       }
//     });

//     dispatch(suggestions);
//   });

export const getUsers = () => {
  const usersData = getDocs(colUsersRef)
    .then((snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data()) {
          const date = doc.data().createdAt.toDate().toString();
          users.push({ ...doc.data(), id: doc.id, createdAt: date });
        }
      });
      return users;
    })
    .catch((err) => {
      console.log(err.message);
    });
  return usersData;
};

export const getUser = async (userId) => {
  try {
    const userData = await getDoc(doc(db, "users", userId));
    // console.log("user", userId, userData, userData.data());
    const date = userData.data().createdAt.toDate().toString();

    if (userData.exists()) {
      return { ...userData.data(), createdAt: date };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addUser = async (data, userId) => {
  // const userData = addDoc(colUsersRef, {
  //   createdAt: serverTimestamp(),
  //   ...data,
  // });

  try {
    await setDoc(doc(db, "users", userId), { createdAt: serverTimestamp(), ...data });
    //setDoc ne vraca nista posle uspjesnog upisivanja dokumenta
  } catch (error) {
    throw new Error(error.message);
  }
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
  return suggestionData;
};

export const deleteFeedback = async (id) => {
  const docRef = doc(db, "suggestions", id);
  await deleteDoc(docRef);
};

export const getFeedback = async (feedbackId) => {
  try {
    const feedbackData = await getDoc(doc(db, "suggestions", feedbackId));
    console.log("STAMPAM STA JE STIGLO IZ FIREBASE feedbackData.data()", feedbackData);
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
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      dispatch(user);
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
