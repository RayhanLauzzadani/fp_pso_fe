// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import LoginForm from '../LoginForm'
// import '@testing-library/jest-dom'

// // Mock Firebase
// jest.mock('@/lib/firebaseConfig', () => ({
//   auth: {}
// }))

// jest.mock('firebase/auth', () => ({
//   signInWithEmailAndPassword: jest.fn()
// }))

// describe('LoginForm', () => {
//   it('renders form fields', () => {
//     render(<LoginForm />)

//     expect(screen.getByText(/Sign In to DooIT/i)).toBeInTheDocument()
//     expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
//     expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument()
//     expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()
//   })

//   it('shows alert when login fails', async () => {
//     window.alert = jest.fn()

//     // Mock Firebase to throw error
//     const { signInWithEmailAndPassword } = require('firebase/auth')
//     signInWithEmailAndPassword.mockRejectedValue(new Error('Invalid credentials'))

//     render(<LoginForm />)

//     const user = userEvent.setup()

//     await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
//     await user.type(screen.getByLabelText(/^Password$/i), 'wrongpassword')
//     await user.click(screen.getByRole('button', { name: /Login/i }))

//     expect(window.alert).toHaveBeenCalledWith('Invalid credentials')
//   })

//   it('allows typing in Email and Password', async () => {
//     render(<LoginForm />)

//     const user = userEvent.setup()

//     const emailInput = screen.getByLabelText(/Email/i)
//     const passwordInput = screen.getByLabelText(/^Password$/i)

//     await user.type(emailInput, 'john@example.com')
//     await user.type(passwordInput, 'mypassword')

//     expect(emailInput).toHaveValue('john@example.com')
//     expect(passwordInput).toHaveValue('mypassword')
//   })
// })
