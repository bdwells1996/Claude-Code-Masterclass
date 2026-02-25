import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { useContext } from "react"

vi.mock("@/lib/firebase", () => ({
  auth: {},
}))

// Store reference to create mock for each test
let unsubscribeFn: (() => void) | null = null

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null)
    return () => {
      unsubscribeFn?.()
    }
  }),
}))

import { AuthProvider, AuthContext } from "@/contexts/AuthContext"

function TestComponent() {
  const context = useContext(AuthContext)
  return (
    <div>
      <div data-testid="loading">{context?.loading ? "loading" : "done"}</div>
      <div data-testid="user">
        {context?.user ? `${context.user.email}` : "no user"}
      </div>
    </div>
  )
}

describe("AuthContext", () => {
  beforeEach(() => {
    unsubscribeFn = null
  })

  it("renders children", () => {
    render(
      <AuthProvider>
        <div>test content</div>
      </AuthProvider>
    )

    expect(screen.getByText("test content")).toBeInTheDocument()
  })

  it("provides user: null on initial unauthenticated state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId("user")).toHaveTextContent("no user")
  })

  it("provides user object when Firebase auth resolves with a user", async () => {
    const mockUser = {
      uid: "test-user-id",
      email: "test@example.com",
      displayName: "Test User",
    }

    const { onAuthStateChanged } = await import("firebase/auth")

    vi.mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
      callback(mockUser as any)
      return vi.fn()
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("test@example.com")
    })
  })

  it("loading state becomes false after auth resolves", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("done")
    })
  })
})
