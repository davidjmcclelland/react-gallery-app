import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders text', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/african/i)).toBeInTheDocument();
  });
});
