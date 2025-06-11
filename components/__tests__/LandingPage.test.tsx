<<<<<<< HEAD
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
=======
// import { render, screen } from '@testing-library/react'
// import LandingPage from '@/components/LandingPage'
// import '@testing-library/jest-dom'

// // Mock next/image with typing & displayName
// jest.mock("next/image", () => {
//   const MockedImage = (props: React.ComponentProps<'img'>) => <img {...props} />;
//   MockedImage.displayName = 'NextImage';
//   return MockedImage;
// });

// // Mock next/link as a named function with displayName
// jest.mock("next/link", () => {
//   function NextLink({ children, href }: { children: React.ReactNode; href: string }) {
//     return <a href={href}>{children}</a>;
//   }
//   NextLink.displayName = "NextLink";
//   return NextLink;
// });

// describe('LandingPage', () => {
//   it('renders main title and tagline', () => {
//     render(<LandingPage />)
//     expect(screen.getByRole('heading', { name: /dooIT/i })).toBeInTheDocument()
//     expect(screen.getByText(/Konversi Kurs & Kelola Saldo Mata Uang/i)).toBeInTheDocument()
//   })

//   it('renders DooIT logo', () => {
//     render(<LandingPage />)
//     expect(screen.getByAltText(/DooIT Logo/i)).toBeInTheDocument()
//   })

//   it('renders Sign Up and Log In buttons with correct links', () => {
//     render(<LandingPage />)
//     expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
//     expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
//     expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/register')
//     expect(screen.getByRole('link', { name: /log in/i })).toHaveAttribute('href', '/login')
//   })

//   it('renders description paragraph', () => {
//     render(<LandingPage />)
//     expect(screen.getByText(/DooIT adalah aplikasi web sederhana/i)).toBeInTheDocument()
//   })
// })
>>>>>>> 942201c05a2cbdcf1c60f8168df9ca6319b08363
