import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useHeists } from '@/hooks/useHeists'
import { AuthProvider } from '@/contexts/AuthContext'

// Mock Firebase
vi.mock('@/lib/firebase', () => ({
  db: {},
  auth: {},
}))

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null)
    return vi.fn()
  }),
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(function () {
    return {
      withConverter: vi.fn().mockReturnValue({}),
    }
  }),
  where: vi.fn(),
  onSnapshot: vi.fn(() => vi.fn()),
}))

describe('useHeists', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns loading false when user is null and filter is active', () => {
    const { result } = renderHook(() => useHeists('active'), {
      wrapper: AuthProvider,
    })

    expect(result.current.heists).toHaveLength(0)
    expect(result.current.loading).toBe(false)
  })

  it('returns empty heists for expired filter initially', () => {
    const { result } = renderHook(() => useHeists('expired'), {
      wrapper: AuthProvider,
    })

    expect(result.current.heists).toHaveLength(0)
    expect(result.current.loading).toBe(true)
  })

  it('unsubscribes from onSnapshot on unmount', async () => {
    const { onSnapshot } = await import('firebase/firestore')
    const mockUnsubscribe = vi.fn()
    vi.mocked(onSnapshot).mockReturnValue(mockUnsubscribe)

    const { unmount } = renderHook(() => useHeists('expired'), {
      wrapper: AuthProvider,
    })

    unmount()

    expect(mockUnsubscribe).toHaveBeenCalled()
  })
})
