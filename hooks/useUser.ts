import { useContext } from "react"
import { AuthContext, AuthContextType } from "@/contexts/AuthContext"

export function useUser(): AuthContextType {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useUser must be used within an AuthProvider")
  }

  return context
}
