/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
// export const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const userSignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const authInfo = {
    user,
    setUser,
    userSignUp,
    userSignIn,
    userSignOut,
    loading,
    googleLogin,
    forgetPassword,
    dbUser,
    setDbUser,
    // userProfileUpdate,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser.email);
      if (currentUser) {
        axios
          .get(`https://fd-backend-peach.vercel.app/users/${currentUser.email}`)
          .then((response) => {
            setDbUser(response.data);
            console.log(response.data);
          });
      }
      setLoading(false);
    });

    // Cleanup the subscription properly
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
