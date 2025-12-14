import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyDRTipGv54O15CWPSh6K8bIuzySwHfb2ww",
  authDomain: "vastra-db-6a35d.firebaseapp.com",
  projectId: "vastra-db-6a35d",
  storageBucket: "vastra-db-6a35d.appspot.com",
  messagingSenderId: "379272702138",
  appId: "1:379272702138:web:27d6caf897aaa0f33efa83",
  measurementId: "G-0Q4DSMCZ01",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/* 🔴 FIX IS HERE */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return null;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  try {
    const snapShot = await userRef.get({ source: "server" });

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    }

    return userRef;
  } catch (error) {
    console.log("Firestore offline or blocked:", error.message);
    return userRef; // still return ref so App.js snapshot works
  }
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
