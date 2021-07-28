import React, { useState, useEffect, useCallback } from 'react'
import { Temporal } from '@js-temporal/polyfill/lib/index.mjs';
import './App.css'
import ClockFace from './components/ClockFace'
import ProgressIndicator from './components/ProgressIndicator'

const STARTING_SECONDS = 1500
const SHORT_BREAK = 300
const LONG_BREAK = 900

const breakDurationSequence = [
  SHORT_BREAK,
  SHORT_BREAK,
  SHORT_BREAK,
  LONG_BREAK,
]

function App() {
  const [timer, setTimer] = useState(STARTING_SECONDS)
  const [maxTime, setMaxTime] = useState(STARTING_SECONDS)
  const [startingTime, setStartingTime] = useState(undefined)
  const [isRunning, setIsRunning] = useState(false)
  const [runCount, setRunCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Decide on the task to be done.
  // Set the pomodoro timer (traditionally to 25 minutes).[1]
  // Work on the task.
  // End work when the timer rings and put a checkmark on a piece of paper.[5]
  // If you have fewer than four checkmarks, take a short break (3–5 minutes) and then return to step 2; otherwise continue to step 6.
  // After four pomodoros, take a longer break (15–30 minutes), reset your checkmark count to zero, then go to step 1.

  const resetTick = useCallback(() => {
    setStartingTime(Temporal.now.instant())
  }, [setStartingTime])

  const playPauseHandler = useCallback(() => {
    console.log("pp handler")
    if (!isRunning && !isPaused) {
      setIsRunning(!isRunning)
    }
    if (isRunning && !isPaused) {
      setIsPaused(!isPaused)
      setIsRunning(!isRunning)
    }

    if (!isRunning && isPaused) {
      // restart the paused clock
      console.log("restart paused")
      setIsRunning(!isRunning)
      setIsPaused(!isPaused)
      resetTick()

    }
  }, [isPaused, isRunning])


  const setTimerLength = useCallback(() => {
    // check if number is odd
    if (runCount % 2 !== 0) {
      setRunCount(runCount + 1)
      setTimer(STARTING_SECONDS)
      setMaxTime(STARTING_SECONDS)
    } else if (runCount === 9) {
      setTimer(STARTING_SECONDS)
      setMaxTime(STARTING_SECONDS)

      setRunCount(0)
    } else {
      setRunCount(runCount + 1)
      const maximum = breakDurationSequence[Math.floor(runCount / 2)]
      setTimer(maximum)
      setMaxTime(maximum)
    }

    resetTick()
  }, [setTimer, setRunCount, runCount, resetTick])

  const runTimer = useCallback(() => {
    if (!startingTime) {
      resetTick()
    }

    const getElapsedTime = () => {
      if (!startingTime) {
        return -1
      }
      const time = Temporal.now.instant().since(startingTime)
      return maxTime - time.seconds
    }

    const tickTock = setInterval(() => {
      if (startingTime) {
        const time = getElapsedTime()

        const shouldAdvance = timer - 1 === time

        if (shouldAdvance) {
          setTimer(timer - 1)
        }
      }

      if (timer < 1) {
        setTimerLength()
        clearInterval(tickTock)
      }
    }, 100)
  }, [startingTime, resetTick, timer, maxTime, setTimerLength])

  useEffect(() => {
    if (isRunning) {
      runTimer()
    }
  }, [runTimer, isRunning])

  return (
    <div className="App">
      <h1><span className="emoji">🍅</span>Pomodoro<span className="emoji">⏳</span></h1>
      <div className="timer" data-testid="timer">
        <ProgressIndicator maxTime={maxTime} timerRunning={isRunning}>
          <ClockFace timeInSeconds={timer} />
          <button className="play-pause-btn" onClick={() => playPauseHandler()}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </ProgressIndicator>
      </div>
    </div>
  )
}

export default App
