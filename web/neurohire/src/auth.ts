// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string,
): Promise<any> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string,
): Promise<any> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = (): Promise<any> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const doSignOut = (): Promise<void> => {
  return signOut(auth);
};
