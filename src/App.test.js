import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

// Fake timers using Jest
beforeEach(() => {
  jest.useFakeTimers()
})

// Running all pending timers and switching to real timers using Jest
afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

const runTimer = (screenFn) => {
  const startPause = screenFn.getByRole('button', { label: /Start/i })
  userEvent.click(startPause)
  act(() => jest.runOnlyPendingTimers() )
}

test('there is a heading', () => {
  render(<App />)
  expect(screen.getByRole('heading')).toBeTruthy()
})

test('there is a start button, when clicked it becomes a pause button', () => {
  render(<App />)
  const startPause = screen.getByRole('button', { label: /Start/i })
  expect(startPause).toBeTruthy()

  runTimer(screen)

  expect(screen.getByRole('button', { label: /Pause/i })).toBeInTheDocument()
})

test('there is a timer, it starts from 25:00', () => {
  render(<App />)
  expect(screen.getByTestId('timer')).toBeTruthy()
  expect(screen.getByText(/25:00/i)).toBeTruthy()
})

test('The second timer starts at 5:00', async () => {
  render(<App />)
  runTimer(screen)

  await waitFor(() => expect(screen.getByText(/5:00/i)).toBeTruthy())
})

test('The third timer starts at 25:00', async () => {
  render(<App />)
  runTimer(screen)
  await screen.findByText(/5:00/i)

  runTimer(screen)

  await waitFor(() => expect(screen.getByText(/25:00/i)).toBeTruthy())
})

test('The seventh timer starts at 15:00', async () => {
  render(<App />)

  runTimer(screen)

  await screen.findByText(/5:00/i)
  runTimer(screen)

  await screen.findByText(/25:00/i)
  runTimer(screen)

  await screen.findByText(/5:00/i)
  runTimer(screen)

  await screen.findByText(/25:00/i)
  runTimer(screen)

  await screen.findByText(/5:00/i)
  runTimer(screen)

  await screen.findByText(/25:00/i)
  runTimer(screen)

  await waitFor(() => expect(screen.getByText(/15:00/i)).toBeTruthy())
})
