import React from 'react'
import PropTypes from 'prop-types'

const pad = (n) => (n < 10 ? '0' + n : n)

export default function ClockFace({ timeInSeconds }) {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = pad(Math.round(timeInSeconds - minutes * 60))
  return (
    <div className="clock-face">
      {minutes}:{seconds}
    </div>
  )
}

ClockFace.propTypes = {
  timeInSeconds: PropTypes.number.isRequired,
}
