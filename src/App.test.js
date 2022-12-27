import { render, screen } from '@testing-library/react';
import App from './App';

test('renders text', () => {
  render(<App />);
  const element = screen.getByText(/get breeds/i);
  expect(element).toBeInTheDocument();
});
