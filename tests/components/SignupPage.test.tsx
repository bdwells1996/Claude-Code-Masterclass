import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SignupPage from '@/app/(public)/signup/page'
import * as auth from 'firebase/auth'
import * as firestore from 'firebase/firestore'
import type { UserCredential } from 'firebase/auth'

vi.mock('firebase/auth')
vi.mock('firebase/firestore')
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('SignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email, password, and confirm password fields', () => {
    render(<SignupPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
  })

  it('renders a submit button', () => {
    render(<SignupPage />)
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('renders a link to log in', () => {
    render(<SignupPage />)
    const link = screen.getByRole('link', { name: /log in/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/login')
  })

  it('shows error when passwords do not match', () => {
    render(<SignupPage />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'different' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('calls createUserWithEmailAndPassword on valid submission', async () => {
    const mockUser = { uid: 'test-uid' }
    vi.mocked(auth.createUserWithEmailAndPassword).mockResolvedValue({
      user: mockUser,
    } as unknown as UserCredential)
    vi.mocked(auth.updateProfile).mockResolvedValue(undefined)
    vi.mocked(firestore.setDoc).mockResolvedValue(undefined)
    vi.mocked(firestore.doc).mockReturnValue({} as never)

    render(<SignupPage />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      const calls = vi.mocked(auth.createUserWithEmailAndPassword).mock.calls
      expect(calls.length).toBeGreaterThan(0)
      const lastCall = calls[calls.length - 1]
      expect(lastCall[1]).toBe('user@example.com')
      expect(lastCall[2]).toBe('password123')
    })
  })

  it('calls updateProfile with codename as displayName', async () => {
    const mockUser = { uid: 'test-uid' }
    vi.mocked(auth.createUserWithEmailAndPassword).mockResolvedValue({
      user: mockUser,
    } as unknown as UserCredential)
    vi.mocked(auth.updateProfile).mockResolvedValue(undefined)
    vi.mocked(firestore.setDoc).mockResolvedValue(undefined)
    vi.mocked(firestore.doc).mockReturnValue({} as never)

    render(<SignupPage />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(vi.mocked(auth.updateProfile)).toHaveBeenCalledWith(
        mockUser,
        {
          displayName: expect.any(String),
        }
      )
    })
  })

  it('calls setDoc without email field', async () => {
    const mockUser = { uid: 'test-uid' }
    vi.mocked(auth.createUserWithEmailAndPassword).mockResolvedValue({
      user: mockUser,
    } as unknown as UserCredential)
    vi.mocked(auth.updateProfile).mockResolvedValue(undefined)
    vi.mocked(firestore.setDoc).mockResolvedValue(undefined)
    vi.mocked(firestore.doc).mockReturnValue({} as never)

    render(<SignupPage />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(vi.mocked(firestore.setDoc)).toHaveBeenCalledWith(
        {},
        {
          id: 'test-uid',
          codename: expect.any(String),
        }
      )
    })
  })

  it('displays error message on Firebase error', async () => {
    const errorMessage = 'Firebase error: Email already in use'
    vi.mocked(auth.createUserWithEmailAndPassword).mockRejectedValue(
      new Error(errorMessage)
    )

    render(<SignupPage />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })
})
