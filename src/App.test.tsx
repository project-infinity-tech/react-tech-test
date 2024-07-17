import { test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('Renders our static data', async () => {
  render(<App />);

  await waitFor(() => expect(screen.getByText('Static')).toBeInTheDocument());
});
