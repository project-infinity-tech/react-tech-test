import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders our dynamic data', async () => {
  render(<App />);

  // TODO this should maybe find the element...?
  expect('Static').toBeInTheDocument();
});
