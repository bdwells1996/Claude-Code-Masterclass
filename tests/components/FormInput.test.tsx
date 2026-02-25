import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FormInput from '@/components/FormInput'

describe('FormInput', () => {
  it('renders with correct label', () => {
    render(<FormInput id="email" label="Email" value="" onChange={() => {}} />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('renders with correct placeholder', () => {
    render(
      <FormInput
        id="email"
        label="Email"
        value=""
        onChange={() => {}}
        placeholder="you@example.com"
      />
    )
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('renders with email type', () => {
    render(
      <FormInput id="email" label="Email" type="email" value="" onChange={() => {}} />
    )
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email')
  })

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()
    render(<FormInput id="email" label="Email" value="" onChange={handleChange} />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('reflects controlled value', () => {
    render(
      <FormInput id="email" label="Email" value="hello@test.com" onChange={() => {}} />
    )
    expect(screen.getByLabelText(/email/i)).toHaveValue('hello@test.com')
  })
})
