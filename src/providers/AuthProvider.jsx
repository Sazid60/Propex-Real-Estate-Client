import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";


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

    // const saveUserData = async user => {
    //     const currentUser = {
    //       email: user?.email,
    //       role: 'user',
    //       status: 'Verified',
    //     }
    //     const { data } = await axios.post(`${import.meta.env.VITE_DATABASE_URL}/user`,
    //       currentUser
    //     )
    //     return data
    //   }

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Observing : ", currentUser)
            setUser(currentUser)
            setLoading(true)
            if (currentUser?.email) {
                axios.post('https://propex-server.vercel.app/jwt', { email: currentUser.email })
                    .then(data => {
                        // console.log(data.data.token)
                        localStorage.setItem('access-token', data.data.token)
                        // saveUserData(currentUser)
                        setLoading(false);
                    })
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false);
            }
            // setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])


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