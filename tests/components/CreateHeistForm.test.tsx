import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CreateHeistForm from '@/components/CreateHeistForm'

const mockUsers = [
  { uid: 'user-1', codename: 'Shadow Fox' },
  { uid: 'user-2', codename: 'Iron Ghost' },
]

const defaultProps = {
  onSubmit: vi.fn().mockResolvedValue(undefined),
  users: mockUsers,
  loading: false,
  error: '',
  loadingUsers: false,
}

describe('CreateHeistForm', () => {
  it('renders all three fields and submit button', () => {
    render(<CreateHeistForm {...defaultProps} />)
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/assign to/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create heist/i })).toBeInTheDocument()
  })

  it('submit button is disabled when loading is true', () => {
    render(<CreateHeistForm {...defaultProps} loading={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders error message when error prop is non-empty', () => {
    render(<CreateHeistForm {...defaultProps} error="Something went wrong" />)
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('does not call onSubmit when required fields are empty', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<CreateHeistForm {...defaultProps} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByRole('button', { name: /create heist/i }))
    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  it('calls onSubmit with correct shape when all fields are filled', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<CreateHeistForm {...defaultProps} onSubmit={onSubmit} />)

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'The Big Score' },
    })
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Steal the diamond' },
    })
    fireEvent.change(screen.getByLabelText(/assign to/i), {
      target: { value: 'user-1' },
    })

    fireEvent.click(screen.getByRole('button', { name: /create heist/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'The Big Score',
        description: 'Steal the diamond',
        assignedTo: 'user-1',
        assignedToCodeName: 'Shadow Fox',
      })
    })
  })
})
