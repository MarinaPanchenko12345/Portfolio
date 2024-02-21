// Selecting timer display elements and buttons
const timerMinutes = document.querySelector(".minutes");
const timerSeconds = document.querySelector(".seconds");
const timerMilliseconds = document.querySelector(".milliseconds");
const btnStart = document.querySelector(".btnStart");
const btnStop = document.querySelector(".btnStop");
const btnReset = document.querySelector(".btnReset");

let timerInterval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

// Function to start the timer 
function startTimer() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  // Updating the displayed timer values
  timerMinutes.textContent = minutes.toString().padStart(2, "0");
  timerSeconds.textContent = seconds.toString().padStart(2, "0");
  timerMilliseconds.textContent = milliseconds.toString().padStart(2, "0");
}
btnStart.addEventListener("click", () => {
  if (!timerInterval) {
    timerInterval = setInterval(startTimer, 10);
  }
});
btnStop.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});
btnReset.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  timerMinutes.textContent = "00";
  timerSeconds.textContent = "00";
  timerMilliseconds.textContent = "00";
});
