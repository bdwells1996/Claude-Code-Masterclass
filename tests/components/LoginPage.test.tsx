import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import LoginPage from '@/app/(public)/login/page'

describe('LoginPage', () => {
  it('renders email and password fields', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
  })

  it('renders a submit button', () => {
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })

  it('renders a link to sign up', () => {
    render(<LoginPage />)
    const link = screen.getByRole('link', { name: /sign up/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/signup')
  })

  it('does not submit when fields are empty', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<LoginPage />)
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('console.log is called with email and password on valid submission', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<LoginPage />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'secret123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))
    expect(consoleSpy).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret123',
    })
    consoleSpy.mockRestore()
  })
})
