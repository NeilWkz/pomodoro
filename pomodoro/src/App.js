import React, { useState, useEffect } from 'react'
import './App.css'
import ClockFace from './components/ClockFace'

export const WORK_DURATION = 1500
export const SHORT_BREAK = 300
export const LONG_BREAK = 900

function App() {
  const [timer, setTimer] = useState(WORK_DURATION)
  const [isStarted, setIsStarted] = useState(false)
  const [runCount, setRunCount] = useState(0)

  // Decide on the task to be done.
  // Set the pomodoro timer (traditionally to 25 minutes).[1]
  // Work on the task.
  // End work when the timer rings and put a checkmark on a piece of paper.[5]
  // If you have fewer than four checkmarks, take a short break (3–5 minutes) and then return to step 2; otherwise continue to step 6.
  // After four pomodoros, take a longer break (15–30 minutes), reset your checkmark count to zero, then go to step 1.


  useEffect(() => {
    const runTimer = () => {
      setTimeout(() => {
        setTimer(timer - 1)

        if (timer < 1) {
          setIsStarted(false)
          // check if number is odd
          if (runCount % 2 !== 0) {
            setRunCount(runCount + 1)
            setTimer(WORK_DURATION)
          } else if (runCount < 8 && runCount % 2 === 0) {
            setRunCount(runCount + 1)
            setTimer(SHORT_BREAK)
          } else if (runCount === 8) {
            setRunCount(runCount + 1)
            setTimer(LONG_BREAK)
          } else if (runCount === 9) {
            setTimer(WORK_DURATION)
            setRunCount(0)
          }
        }
      }, 1000)
    }

    if (isStarted) {
      runTimer()
    }
  }, [setTimer, timer, isStarted, setIsStarted, runCount, setRunCount])

  return (
    <div className="App">
      <h1>Pomodoro</h1>
      <div className="timer" data-testid="timer">
        <ClockFace timeInSeconds={timer} />
      </div>
      <button onClick={() => setIsStarted(!isStarted)}>
        {isStarted ? 'Pause' : 'Start'}
      </button>
    </div>
  )
}

export default App
