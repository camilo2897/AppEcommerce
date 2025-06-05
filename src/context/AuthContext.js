import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { auth as firebaseAuth } from '../services/firebaseInit'
import { Platform } from 'react-native'
 
const AuthContext = createContext()
 
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
 
    useEffect(() => {
        let unsubscribe
        
        const setupAuth = async () => {
            try {
                // En dispositivos móviles, esperar un poco más
                if (Platform.OS !== 'web') {
                    await new Promise(resolve => setTimeout(resolve, 2000))
                }
 
                // Intentar obtener auth
                const auth = firebaseAuth || getAuth()
                
                unsubscribe = onAuthStateChanged(auth, (user) => {
                    setUser(user)
                    setLoading(false)
                })
            } catch (error) {
                console.error('Auth setup error:', error)
                setLoading(false)
            }
        }
 
        setupAuth()
 
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [])
 
    if (loading) {
        return null
    }
 
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
 
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}