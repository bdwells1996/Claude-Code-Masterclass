import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HeistCard from '@/components/HeistCard'
import { Heist } from '@/types/firestore'

const mockHeist: Heist = {
  id: 'heist-1',
  title: 'The Diamond Heist',
  description: 'Steal the diamonds from the vault',
  createdBy: 'user-1',
  createdByCodename: 'Shadow Fox',
  assignedTo: 'user-2',
  assignedToCodeName: 'Iron Ghost',
  deadline: new Date(Date.now() + 60 * 60 * 60 * 1000), // More than 2 days from now (60 hours)
  finalStatus: null,
  createdAt: new Date('2026-02-24'),
}

describe('HeistCard', () => {
  it('renders heist title', () => {
    render(<HeistCard heist={mockHeist} />)
    expect(screen.getByText('The Diamond Heist')).toBeInTheDocument()
  })

  it('renders title as a link to /heists/{id}', () => {
    render(<HeistCard heist={mockHeist} />)
    const link = screen.getByRole('link', { name: /the diamond heist/i })
    expect(link).toHaveAttribute('href', '/heists/heist-1')
  })

  it('renders assignedToCodeName', () => {
    render(<HeistCard heist={mockHeist} />)
    expect(screen.getByText('Iron Ghost')).toBeInTheDocument()
  })

  it('renders createdByCodename', () => {
    render(<HeistCard heist={mockHeist} />)
    expect(screen.getByText('Shadow Fox')).toBeInTheDocument()
  })

  it('renders "Overdue" when deadline is in the past', () => {
    const overdueHeist: Heist = {
      ...mockHeist,
      deadline: new Date(Date.now() - 1000), // 1 second ago
    }
    render(<HeistCard heist={overdueHeist} />)
    expect(screen.getByText('Overdue')).toBeInTheDocument()
  })

  it('renders time remaining when deadline is in the future', () => {
    render(<HeistCard heist={mockHeist} />)
    // 48 hours = 2 days
    expect(screen.getByText('2d left')).toBeInTheDocument()
  })

  it('renders created date in short format', () => {
    render(<HeistCard heist={mockHeist} />)
    expect(screen.getByText(/Feb 24, 2026/)).toBeInTheDocument()
  })

  it('renders hours left for deadlines within 24 hours', () => {
    const soonHeist: Heist = {
      ...mockHeist,
      deadline: new Date(Date.now() + 20 * 60 * 60 * 1000), // 20 hours from now
    }
    render(<HeistCard heist={soonHeist} />)
    expect(screen.getByText('20h left')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<HeistCard heist={mockHeist} className="custom-class" />)
    const cardDiv = container.querySelector('.custom-class')
    expect(cardDiv).toBeInTheDocument()
  })
})
