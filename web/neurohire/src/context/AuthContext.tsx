import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext<any>(null);


export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}: any) {
    const [currentUser, setCurrentUser] = useState<any>();
    const [useLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    async function initializeUser(user : any) {
        if (user ) {
            setCurrentUser(user);
            setLoggedIn(true);
        } else {
            setCurrentUser(null);
            setLoggedIn(false);
        }

        setLoading(false);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        useLoggedIn,
        loading,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}