import { render, screen } from '@testing-library/react';
import Page from '../page';
import '@testing-library/jest-dom';

describe('Page', () => {
  it('renders landing page heading', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { name: /DooIT/i })).toBeInTheDocument();
  });

  it('has sign up and login links', () => {
    render(<Page />);
    expect(screen.getByRole('link', { name: /Sign Up/i })).toHaveAttribute('href', '/register');
    expect(screen.getByRole('link', { name: /Log In/i })).toHaveAttribute('href', '/login');
  });
});