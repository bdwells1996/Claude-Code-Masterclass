"use client"

import { createContext, ReactNode, useEffect, useState } from "react"
import { User, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

export type AuthContextType = {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
