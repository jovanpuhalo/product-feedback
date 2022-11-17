import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
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
  getDocs,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { deleteObject, getStorage, ref } from "firebase/storage";
initializeApp(firebaseConfig);

const db = getFirestore();

const colSuggestionsRef = collection(db, "suggestions");

const auth = getAuth();
const user = auth.currentUser;

export const getSuggestions = (dispatch) => {
  return new Promise((resolve, reject) => {
    onSnapshot(colSuggestionsRef, (snapshot) => {
      let suggestions = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data().createdAt) {
          const date = doc.data().createdAt.toDate().toString();
          suggestions.push({ ...doc.data(), id: doc.id, createdAt: date });
        }
      });

      resolve(dispatch(suggestions));
    });
  });
};

export const getUser = async (userId) => {
  try {
    const userData = await getDoc(doc(db, "users", userId));
    const date = userData.data()?.createdAt.toDate().toString();

    if (userData.exists()) {
      return { ...userData.data(), createdAt: date };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addUser = async (data, userId) => {
  try {
    await setDoc(doc(db, "users", userId), { createdAt: serverTimestamp(), ...data });
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

export const deleteUsers = async (id) => {
  const storage = getStorage();
  const docRef = doc(db, "users", id);
  const userData = await getDoc(docRef);

  await deleteDoc(docRef);

  //brisanje slike
  if (userData.data()?.image) {
    const storageRef = ref(storage, userData.data().image);
    deleteObject(storageRef)
      .then(() => {
        console.log("USPJESNO JE NEMA");
      })
      .catch((error) => {});
  }

  await updateDoc(doc(db, "init", "start state"), {
    users: arrayRemove(id),
  });
};

export const addFeedback = (data) => {
  const suggestionData = addDoc(colSuggestionsRef, {
    createdAt: serverTimestamp(),
    ...data,
  });
  return suggestionData;
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

export const updateFeedback = async (id, data) => {
  const docRef = doc(db, "suggestions", id);
  await updateDoc(docRef, data);
};
export const deleteFeedback = async (id) => {
  const docRef = doc(db, "suggestions", id);
  await deleteDoc(docRef);

  await updateDoc(doc(db, "init", "start state"), {
    feedbacks: arrayRemove(id),
  });
};

export const updateFeedbackVote = async (method, id) => {
  const docRef = doc(db, "suggestions", id);
  if (method === "increment") {
    await updateDoc(docRef, { upVotes: increment(1) });
  } else {
    await updateDoc(docRef, { upVotes: increment(-1) });
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
export const removeComment = async (feedbackId, data) => {
  try {
    await updateDoc(doc(db, "suggestions", feedbackId), {
      comments: arrayRemove(data),
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

// export const currentSignInUser = (dispatch) => {
//   onAuthStateChanged(getAuth(), async (user) => {
//     console.log("TRENUTNO LOGOVANI USER", user);
//     if (user) {
//       dispatch(user);
//     } else {
//       await initDeleteFeedbacks();
//     }
//   });
// };

export const signOutUser = async () => {
  try {
    const res = await signOut(auth);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = async (data) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
    await addUser(
      {
        name: data.fullname,
        image: data.image,
        status: "user",
        email: data.email,
        username: data.username,
        upVotedSugestions: data.upVotedSugestions,
      },
      user.user.uid
    );

    await addUserInit(user.user.uid); //dodavanje id-ija u initijalni dokument u firestore(zbog resetovanja podataka)
  } catch (error) {
    throw new Error(error.message);
  }
  return user;
};

export const addFeedbackInit = async (id) => {
  const docRef = doc(db, "init", "start state");
  await updateDoc(docRef, { feedbacks: arrayUnion(id) });
};

export const addUserInit = async (id) => {
  const docRef = doc(db, "init", "start state");
  await updateDoc(docRef, { users: arrayUnion(id) });
};

//setovanje baze na default state
export const initDeleteFeedbacks = async () => {
  const initDeleteData = await getDoc(doc(db, "init", "start state"));
  initDeleteData.data().feedbacks.map(async (id) => await deleteFeedback(id));

  //brisemo sve komentare i reply od Zenna Keley , postavljamo stanje na pocetno u bazi
  //imamo da zastitmo dva komentara i jedan reply
  const allFeedbacks = await getDocs(colSuggestionsRef)
    .then((snapshot) => {
      let suggestions = [];
      snapshot.docs.forEach((doc) => {
        suggestions.push(doc.data());
      });
      return suggestions;
    })
    .catch((err) => {});

  allFeedbacks.forEach((feedback) => {
    feedback.comments.forEach(async (comment, commentIndex) => {
      if (
        (feedback.id !== "Tz0tfCqA8uTqf80xEXb0" || commentIndex !== 0) &&
        (feedback.id !== "hbUvQSxctPdRrYpkKRK8" || commentIndex !== 0)
      )
        if (comment.userId === "K0aGJsvhSHfN3txRatGu2O5cWyl2") {
          updateDoc(doc(db, "suggestions", feedback.id), {
            comments: arrayRemove(comment),
          });
        }

      const replies = [];
      comment.replies.forEach((reply, replyIndex) => {
        if (
          reply.userId !== "K0aGJsvhSHfN3txRatGu2O5cWyl2" ||
          (feedback.id === "Hbt1BBoewGUngeCT0ZdT" && replyIndex === 1 && commentIndex === 1)
        ) {
          replies.push(reply);
        }

        if (replyIndex === comment.replies.length - 1) {
          comment.replies = [...replies];
          updateDoc(doc(db, "suggestions", feedback.id), {
            ...feedback,
            comments: [...feedback.comments],
          });
        }
      });
    });
  });
};

export const initDeleteUsers = async () => {
  //moramo i sve komentare i reply obrisati zato nam ovo treba
  const allFeedbacks = await getDocs(colSuggestionsRef)
    .then((snapshot) => {
      let suggestions = [];
      snapshot.docs.forEach((doc) => {
        suggestions.push(doc.data());
      });
      return suggestions;
    })
    .catch((err) => {});

  const initDeleteData = await getDoc(doc(db, "init", "start state"));

  initDeleteData.data().users.forEach((id) => {
    allFeedbacks.forEach((feedback) => {
      feedback.comments.forEach((comment) => {
        if (comment.userId === id) {
          updateDoc(doc(db, "suggestions", feedback.id), {
            comments: arrayRemove(comment),
          });
        }

        comment.replies.forEach((reply, index) => {
          if (reply.userId === id) {
            comment.replies.splice(index, 1);
            updateDoc(doc(db, "suggestions", feedback.id), {
              ...feedback,
              comments: [...feedback.comments],
            });
          }
        });
      });
    });
    deleteUsers(id);
  });
};
