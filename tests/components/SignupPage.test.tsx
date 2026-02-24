import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SignupPage from '@/app/(public)/signup/page'

describe('SignupPage', () => {
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

  it('does not submit when fields are empty', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<SignupPage />)
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
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

  it('does not console.log when passwords do not match', () => {
    const consoleSpy = vi.spyOn(console, 'log')
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
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('console.log is called with email and password on valid submission', () => {
    const consoleSpy = vi.spyOn(console, 'log')
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
    expect(consoleSpy).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    })
    consoleSpy.mockRestore()
  })
})
