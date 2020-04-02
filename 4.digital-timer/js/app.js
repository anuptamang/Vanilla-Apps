const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('#circle-after circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onPause() {
    console.log('Timer is Paused');
  },
  onTick(timeRemaining) {
    circle.setAttribute('stroke-dashoffset',
      perimeter * timeRemaining / duration - perimeter
    );
  },
  onComplete() {
    console.log('Timer is completed');
  }
});