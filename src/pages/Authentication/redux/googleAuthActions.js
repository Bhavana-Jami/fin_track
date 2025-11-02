import {
  GOOGLE_SIGNIN_START,
  GOOGLE_SIGNIN_SUCCESS,
  GOOGLE_SIGNIN_FAILURE,
  GOOGLE_SIGN_OUT
} from "./googleAuthActionTypes";

import { auth, googleAuthProvider, db } from "../../../../firebaseconfig";
import { signInWithPopup, signOut,  onAuthStateChanged} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const googleSignInStart = () => ({
  type: GOOGLE_SIGNIN_START,
});

export const googleSignInSuccess = (user) => ({
  type: GOOGLE_SIGNIN_SUCCESS,
  payload: user,
});

export const googleSignInFailure = (error) => ({
  type: GOOGLE_SIGNIN_FAILURE,
  payload: error,
});

export const googleSignOut = () => ({
  type: GOOGLE_SIGN_OUT,
});

export const initiateGoogleSignIn = () => {
  return async (dispatch) => {
    try {
      dispatch(googleSignInStart());
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        photoURL: user.photoURL || "",

      };
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, userData, { merge: true });
      dispatch(googleSignInSuccess(user));
    } catch (e) {
      dispatch(googleSignInFailure(e.message));
    }
  };
};

export const initiateSignOut = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(googleSignOut());
    } catch (e) {
      console.error("Sign-Out Error:", e);
    }
  };
};
export const listenForAuthChanges = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(googleSignInSuccess(user));
      } else {
        dispatch(googleSignOut());
      }
    });
  };
};