import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Footer from '../../src/components/footer'

expect.extend(toHaveNoViolations)

describe('Footer component', () => {
  it('renders a contentinfo landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('shows the meeting address', () => {
    render(<Footer />)
    expect(screen.getByText(/710 Gravel Hill Road/i)).toBeInTheDocument()
    expect(screen.getByText(/Southampton, PA 18966/i)).toBeInTheDocument()
  })

  it('links to Philadelphia Yearly Meeting', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /Philadelphia Yearly Meeting/i })
    expect(link).toHaveAttribute('href', 'https://www.pym.org/')
  })

  it('links to Bucks Quarterly Meeting', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /Bucks Quarterly Meeting/i })
    expect(link).toHaveAttribute('href', 'http://www.quakersbucks.org/')
  })

  it('links to the Facebook page', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /Facebook/i })
    expect(link.getAttribute('href')).toMatch(/facebook\.com\/SouthamptonQuakers/i)
  })

  it('shows the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
