import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    count: 25,
    minutes: 25,
    seconds: 0,
    isTimerRunning: false,
  }

  onDecreaseCounter = () => {
    const {count, isTimerRunning} = this.state
    if (count > 1 && !isTimerRunning) {
      this.setState(prevState => ({
        count: prevState.count - 1,
        minutes: prevState.count - 1,
        seconds: 0,
      }))
    }
  }

  onIncreaseCounter = () => {
    const {count, isTimerRunning} = this.state
    if (count < 25 && !isTimerRunning) {
      this.setState(prevState => ({
        count: prevState.count + 1,
        minutes: prevState.count + 1,
        seconds: 0,
      }))
    }
  }

  toggleStartPauseIcon = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(this.decrementTimer, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  decrementTimer = () => {
    this.setState(prevState => {
      const {minutes, seconds} = prevState
      if (minutes === 0 && seconds === 0) {
        clearInterval(this.timerId)
        return {isTimerRunning: false}
      }
      if (seconds === 0) {
        return {minutes: minutes - 1, seconds: 59}
      }
      return {seconds: seconds - 1}
    })
  }

  onResetTimer = () => {
    clearInterval(this.timerId)
    this.setState({isTimerRunning: false, count: 25, minutes: 25, seconds: 0})
  }

  formatTime = () => {
    const {minutes, seconds} = this.state
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${formattedMinutes}:${formattedSeconds}`
  }

  render() {
    const {count, isTimerRunning} = this.state
    const timerStatus = isTimerRunning ? 'Running' : 'Paused'
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseImgUrlsAlt = isTimerRunning ? 'pause icon' : 'play icon'
    const startOrPauseText = isTimerRunning ? 'Pause' : 'Start'

    return (
      <div className="app-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="timer-overall-container">
          <div className="image-timer-container">
            <div className="timer-container">
              <h1 className="timer">{this.formatTime()}</h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-controller-container">
            <div className="icons-container">
              <button
                type="button"
                className="start-pause-button"
                onClick={this.toggleStartPauseIcon}
              >
                <img
                  src={startOrPauseImgUrl}
                  alt={startOrPauseImgUrlsAlt}
                  className="start-pause-icon"
                />
                <p className="start-pause-text">{startOrPauseText}</p>
              </button>

              <button
                type="button"
                className="reset-button"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset-icon"
                />
                <p className="reset-text">Reset</p>
              </button>
            </div>
            <p className="set-timer-limit-text">Set Timer Limit</p>
            <div className="increment-decrement-count-container">
              <button
                className="decrease-count-button"
                type="button"
                onClick={this.onDecreaseCounter}
              >
                -
              </button>
              <p className="count">{count}</p>
              <button
                type="button"
                className="increase-count-button"
                onClick={this.onIncreaseCounter}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
