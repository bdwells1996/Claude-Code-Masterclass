import { describe, it, expect, beforeEach, vi } from "vitest"
import { renderHook } from "@testing-library/react"
import { useUser } from "@/hooks/useUser"
import { AuthProvider } from "@/contexts/AuthContext"

// Mock Firebase auth
vi.mock("@/lib/firebase", () => ({
  auth: {},
}))

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null)
    return vi.fn()
  }),
}))

describe("useUser", () => {
  it("throws error when used outside AuthProvider", () => {
    expect(() => {
      renderHook(() => useUser())
    }).toThrow("useUser must be used within an AuthProvider")
  })

  it("returns user and loading state when used inside AuthProvider", () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: AuthProvider,
    })

    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBe(false)
  })
})
