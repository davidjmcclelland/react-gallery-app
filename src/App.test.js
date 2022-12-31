import { render, screen } from '@testing-library/react';
import App from './App';

test('renders text', () => {
  render(<App />);
  const element = screen.getByText(/African/i);
  expect(element).toBeInTheDocument();
});
