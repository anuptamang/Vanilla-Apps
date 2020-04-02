class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.isTimerRunning = false;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onPause = callbacks.onPause;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (!this.isTimerRunning) {
      if (this.onStart) {
        this.onStart(this.timeRemaining);
      }
      this.tick();
      this.timerId = setInterval(this.tick, 20);
    }

    return this.isTimerRunning = true;
  }

  tick = () => {

    if (parseFloat(this.timeRemaining) <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  }

  pause = () => {
    if (this.isTimerRunning) {
      clearInterval(this.timerId);
      if (this.onPause) {
        this.onPause();
      }
    }

    return this.isTimerRunning = false;
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}