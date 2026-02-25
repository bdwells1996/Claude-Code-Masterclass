import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AuthForm from '@/components/AuthForm'

describe('AuthForm', () => {
  describe('login mode', () => {
    it('renders with login title and button', () => {
      render(<AuthForm type="login" onSubmit={async () => {}} />)
      expect(screen.getByText(/log in to your account/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
    })

    it('does not render confirm password field', () => {
      render(<AuthForm type="login" onSubmit={async () => {}} />)
      expect(screen.queryByLabelText(/confirm password/i)).not.toBeInTheDocument()
    })

    it('renders link to signup', () => {
      render(<AuthForm type="login" onSubmit={async () => {}} />)
      const link = screen.getByRole('link', { name: /sign up/i })
      expect(link).toHaveAttribute('href', '/signup')
    })

    it('calls onSubmit with email and password', async () => {
      const handleSubmit = vi.fn().mockResolvedValue(undefined)
      render(<AuthForm type="login" onSubmit={handleSubmit} />)
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'user@example.com' },
      })
      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: 'secret123' },
      })
      fireEvent.click(screen.getByRole('button', { name: /log in/i }))
      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
          email: 'user@example.com',
          password: 'secret123',
        })
      })
    })
  })

  describe('signup mode', () => {
    it('renders with signup title and button', () => {
      render(<AuthForm type="signup" onSubmit={async () => {}} />)
      expect(screen.getByText(/sign up for an account/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })

    it('renders confirm password field', () => {
      render(<AuthForm type="signup" onSubmit={async () => {}} />)
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    })

    it('renders link to login', () => {
      render(<AuthForm type="signup" onSubmit={async () => {}} />)
      const link = screen.getByRole('link', { name: /log in/i })
      expect(link).toHaveAttribute('href', '/login')
    })

    it('shows error when passwords do not match', () => {
      render(<AuthForm type="signup" onSubmit={async () => {}} />)
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

    it('does not call onSubmit when passwords do not match', () => {
      const handleSubmit = vi.fn().mockResolvedValue(undefined)
      render(<AuthForm type="signup" onSubmit={handleSubmit} />)
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
      expect(handleSubmit).not.toHaveBeenCalled()
    })

    it('calls onSubmit with email and password when passwords match', async () => {
      const handleSubmit = vi.fn().mockResolvedValue(undefined)
      render(<AuthForm type="signup" onSubmit={handleSubmit} />)
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
        expect(handleSubmit).toHaveBeenCalledWith({
          email: 'user@example.com',
          password: 'password123',
        })
      })
    })
  })
})
