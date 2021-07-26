import React, { useRef, useEffect, useState } from 'react'

export default function ProgressIndicator({maxTime, timerRunning, children}) {
  const spinner = useRef(0)
  const rightMask = useRef(0)
  const leftMask = useRef(0)
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    console.log(maxTime)
    if (timerRunning && maxTime && !animationStarted) {
      const animatedElements = [spinner, rightMask, leftMask]

      animatedElements.forEach((elem) => {
        elem.current.style.setProperty(
          'animation-duration',
          `${maxTime}s`
        )
      })

      setAnimationStarted(true)
    }
  }, [maxTime, timerRunning, animationStarted, setAnimationStarted])

  return (
    <div className="progress-indicator">
      <div className="outer-rim">
        <div className="inner-rim">
          <div ref={spinner} className="circle spinner"></div>
          <div ref={rightMask} className="circle right-mask"></div>
          <div ref={leftMask} className="left-mask"></div>
          <div className="center-mask">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
