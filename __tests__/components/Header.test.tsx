import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Header from '../../src/components/header'

expect.extend(toHaveNoViolations)

describe('Header component', () => {
  it('renders a banner landmark', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('shows the meeting name', () => {
    render(<Header />)
    expect(screen.getByText(/Southampton Friends Meeting/i)).toBeInTheDocument()
  })

  it('lists the primary navigation links', () => {
    render(<Header />)
    expect(screen.getAllByText(/Welcome/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Sunday Worship/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/About/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Contact/i).length).toBeGreaterThanOrEqual(1)
  })

  it('exposes a mobile menu toggle', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Header />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
