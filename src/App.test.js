import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';


// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
})

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('there is a heading', () => {
  render(<App />);
  expect(screen.getByRole('heading')).toBeTruthy()

});

test('there is a start button, when clicked it becomes a pause button', () => {
  render(<App />);
  const startPause = screen.getByRole('button', {label: /Start/i})
  expect(startPause).toBeTruthy()
  userEvent.click(startPause)
  expect(screen.getByRole('button', {label: /Pause/i})).toBeTruthy()

});

test('there is a timer, it starts from 25:00', () => {
  render(<App />);
  expect(screen.getByTestId('timer')).toBeTruthy()
  expect(screen.getByText(/25:00/i)).toBeTruthy()
});

test('The first increment lasts', () => {
  render(<App />);
  const startPause = screen.getByRole('button', {label: /Start/i})
  userEvent.click(startPause)


});


