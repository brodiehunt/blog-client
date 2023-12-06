import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';

import App from '../App.jsx';

describe('something truthy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  })
})

describe('App test', () => {
  it('renders headline', () => {
    render(<App />);

    expect(screen.getByRole("heading", {name: /hello world/i})).toBeInTheDocument();
  })
})