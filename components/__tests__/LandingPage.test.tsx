import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'
import '@testing-library/jest-dom'

describe('LandingPage', () => {
  it('renders logo image', () => {
    render(<LandingPage />)
    const logo = screen.getByAltText('DooIT Logo')
    expect(logo).toBeInTheDocument()
  })

  it('renders main heading', () => {
    render(<LandingPage />)
    const heading = screen.getByRole('heading', { name: /DooIT/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<LandingPage />)
    expect(
      screen.getByText(/Konversi Kurs & Kelola Saldo Mata Uang/i)
    ).toBeInTheDocument()
  })

  it('renders Sign Up button with correct link', () => {
    render(<LandingPage />)
    const link = screen.getByRole('link', { name: /Sign Up/i })
    expect(link).toHaveAttribute('href', '/register')
  })

  it('renders Log In button with correct link', () => {
    render(<LandingPage />)
    const link = screen.getByRole('link', { name: /Log In/i })
    expect(link).toHaveAttribute('href', '/login')
  })
})
