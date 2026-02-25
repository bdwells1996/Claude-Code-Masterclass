import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PasswordInput from '@/components/PasswordInput'

describe('PasswordInput', () => {
  it('renders with correct label', () => {
    render(<PasswordInput id="password" label="Password" value="" onChange={() => {}} />)
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
  })

  it('starts with password hidden (type="password")', () => {
    render(<PasswordInput id="password" label="Password" value="" onChange={() => {}} />)
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password')
  })

  it('shows password when toggle is clicked', () => {
    render(<PasswordInput id="password" label="Password" value="" onChange={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /show password/i }))
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'text')
  })

  it('hides password again when toggle is clicked twice', () => {
    render(<PasswordInput id="password" label="Password" value="" onChange={() => {}} />)
    const toggle = screen.getByRole('button', { name: /show password/i })
    fireEvent.click(toggle)
    fireEvent.click(screen.getByRole('button', { name: /hide password/i }))
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password')
  })

  it('does not clear input value when toggled', () => {
    render(
      <PasswordInput id="password" label="Password" value="mypassword" onChange={() => {}} />
    )
    fireEvent.click(screen.getByRole('button', { name: /show password/i }))
    expect(screen.getByLabelText(/^password$/i)).toHaveValue('mypassword')
  })

  it('toggle button has accessible name', () => {
    render(<PasswordInput id="password" label="Password" value="" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument()
  })

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()
    render(
      <PasswordInput id="password" label="Password" value="" onChange={handleChange} />
    )
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'secret' },
    })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
