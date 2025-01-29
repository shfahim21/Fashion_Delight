// /* eslint-disable react/prop-types */
// import { createContext, useEffect, useState } from "react";
// import app from "../Firebase/Firebase.config";
// // import {  } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   initializeAuth,
//   createUserWithEmailAndPassword,
//   getAuth,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
//   getReactNativePersistence ,
// } from "firebase/auth";
// import axios from "axios";

// export const AuthContext = createContext();
// // export const auth = getAuth(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [dbUser, setDbUser] = useState(null);
//   const provider = new GoogleAuthProvider();

//   const userSignUp = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const userSignIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const userSignOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   const googleLogin = () => {
//     setLoading(true);
//     return signInWithPopup(auth, provider);
//   };

//   const forgetPassword = (email) => {
//     return sendPasswordResetEmail(auth, email);
//   };
//   const authInfo = {
//     user,
//     setUser,
//     userSignUp,
//     userSignIn,
//     userSignOut,
//     loading,
//     googleLogin,
//     forgetPassword,
//     dbUser,
//     setDbUser,
//     // userProfileUpdate,
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         console.log(currentUser.email);
//         axios
//         // http://192.168.1.104:4000/users/
//         // https://fashion-delight.vercel.app/users/
//           .get(`http://192.168.1.104:4000/users/${currentUser.email}`)
//           .then((response) => {
//             setDbUser(response.data);
//             console.log(response.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching user data:", error);
//           });
//       } else {
//         // Handle the case where there is no user logged in
//         console.log("No user is currently logged in.");
//         setDbUser(null);
//       }
//       setLoading(false);
//     });
  
//     // Cleanup the subscription properly
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// }

// export default AuthProvider;

import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getReactNativePersistence,
} from "firebase/auth";
import axios from "axios";
import API_URL from "../config";

export const AuthContext = createContext();

// Initialize auth with proper error handling
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  auth = getAuth(app);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(null);
  const provider = new GoogleAuthProvider();

  // Wrap authentication methods in try-catch blocks
  const userSignUp = async (email, password) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const userSignIn = async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const userSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async (email) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  // Separate API call into its own function
  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`${API_URL}/users/${email}`);
      setDbUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          console.log(currentUser.email);
          await fetchUserData(currentUser.email);
        } else {
          console.log("No user is currently logged in.");
          setDbUser(null);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error("Auth state change error:", error);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;