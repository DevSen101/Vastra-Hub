import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const config = {
  apiKey: "AIzaSyDRTipGv54O15CWPSh6K8bIuzySwHfb2ww",
  authDomain: "vastra-db-6a35d.firebaseapp.com",
  projectId: "vastra-db-6a35d",
  storageBucket: "vastra-db-6a35d.firebasestorage.app",
  messagingSenderId: "379272702138",
  appId: "1:379272702138:web:27d6caf897aaa0f33efa83",
  measurementId: "G-0Q4DSMCZ01",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("Error creating user", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
