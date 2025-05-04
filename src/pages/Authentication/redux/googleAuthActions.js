import { 
  GOOGLE_SIGNIN_START, 
  GOOGLE_SIGNIN_SUCCESS, 
  GOOGLE_SIGNIN_FAILURE, 
  GOOGLE_SIGN_OUT 
} from "./googleAuthActionTypes";

import { auth, googleAuthProvider, db } from "../../../../firebaseconfig";
import { signInWithPopup, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
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

      // Set authentication persistence
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;  

      if (!user) throw new Error("Google Sign-In failed");

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        photoURL: user.photoURL || "",
       
      };

      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, userData, { merge: true });

      dispatch(googleSignInSuccess(user));

      console.log("✅ Google Sign-In Successful:", user);
    } catch (e) {
      console.error("❌ Google Sign-In Error:", e);
      dispatch(googleSignInFailure(e.message));
    }
  };
};

export const initiateSignOut = () => {
  return async (dispatch) => {
    try {
      console.log("🔄 Signing out...");
      await signOut(auth);
      dispatch(googleSignOut());
      console.log("✅ User signed out");
    } catch (e) {
      console.error("❌ Sign-Out Error:", e);
    }
  };
};
