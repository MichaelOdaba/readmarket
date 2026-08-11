import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import { auth, googleAuthProvider } from "../config/firebase";

export async function signUp(email: string, password: string) {
  const cred: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await sendEmailVerification(cred.user);
  return cred;
}

export async function login(email: string, password: string) {
  const cred: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return cred;
}

export async function loginWithGoogle() {
  const cred = await signInWithPopup(auth, googleAuthProvider);
  return cred;
}
//resend email verification
export async function resendEmailVerification() {
  if (!auth.currentUser) throw new Error("No user is currently signed in");
  await sendEmailVerification(auth.currentUser);
}

export async function logout() {
  return signOut(auth);
}
export const getFirebaseErrorMessage = (code?: string): string => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/email-already-in-use":
      return "An account with this email already exists";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled";
    default:
      return "Something went wrong. Please try again";
  }
};
