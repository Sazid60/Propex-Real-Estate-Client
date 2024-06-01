import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,GithubAuthProvider, GoogleAuthProvider  } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import  app  from "../firebase/firebase.config";


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const auth = getAuth(app)
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    // Register User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    // User SignIn
    const logInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google Sign In
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //  Github Sign In
    const gitHubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, gitHubProvider)
    }
    //User Update
    const updateUser = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }
    // Log out
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Observing : ", currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [user?.email])


    const authInformation = {
        user,
        loading,
        createUser,
        updateUser,
        logInUser,
        signOutUser,
        googleLogin,
        gitHubLogin,
        setUser,
    }
    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;