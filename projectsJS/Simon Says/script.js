// Variable definition
const topLeft = document.querySelector(".top-left");
const topRight = document.querySelector(".top-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomRight = document.querySelector(".bottom-right");

// Function to create a random element from the array
const createStep = () => {
  const figures = [topLeft, topRight, bottomLeft, bottomRight];
  return figures[parseInt(Math.random() * figures.length)];
};

// Array 'sequences' with one random element
let sequences = [createStep()];
// Creating a copy of the 'sequences' array
let sequenceToGuess = sequences.slice();

// Function to flash an element using Promise
const flash = (figure) => {
  return new Promise((resolve, reject) => {
    figure.className += " active";
    setTimeout(() => {
      figure.className = figure.className.replace(" active", "");
      setTimeout(() => {
        resolve();
      }, 350);
    }, 1000);
  });
};

// Variable indicating whether clicking on elements is allowed at the current moment.
let userTurn = false;

// Asynchronous function to start flashing elements
const startFlashing = async () => {
  userTurn = false;
  for (const figure of sequences) {
    await flash(figure);
  }
  userTurn = true;
};

// Score counter
let recordCounter = 0;
let maxRecordCounter = 0;
let recordCounterElement = document.getElementById("recordCounter");

// Function to update the score counter
const recordsCounter = () => {
  if (scoreCounter > maxRecordCounter) {
    maxRecordCounter = scoreCounter;
    recordCounterElement.innerHTML = `Record <br> ${maxRecordCounter}`;
    localStorage.setItem("maxRecordCounter", maxRecordCounter.toString());
  }
};

// Rounds counter
let roundCounter = 0;
let roundCounterElement = document.getElementById("roundCounter");

// Function to update the rounds counter
const roundsCounter = () => {
  roundCounter++;
  roundCounterElement.innerHTML = `Round <br> ${roundCounter}`;
};

// Score counter
let scoreCounter = -5;
let scoreCounterElement = document.getElementById("scoreCounter");

// Function to update the score counter
const scoresCounter = () => {
  if (gameStarted) {
    scoreCounter += 5;
    scoreCounterElement.innerHTML = `Score <br> ${scoreCounter}`;
  }
};

// Popup window
const wrapper = document.getElementById("wrapper");
const popupMessageElement = document.getElementById("popupMessage");

// Function to display the popup window
const showPopup = (message) => {
  popupMessageElement.innerHTML = message;
  wrapper.style.display = "block";
};

// Function to hide the popup window
const hidePopup = () => {
  wrapper.style.display = "none";
};

// Function handling the click on the figure callback function
let figureClicked = (figureClicked) => {
  if (!userTurn) return;
  let expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === figureClicked) {
    if (sequenceToGuess.length === 0) {
      // Victory in the round
      showPopup("You are WIN!!! </br> Next Round");
      roundsCounter();
      scoresCounter();
      recordsCounter();
      setTimeout(() => {
        hidePopup();
        setTimeout(() => {
          // Adding a new element to the array and starting flashing again
          sequences.push(createStep());
          sequenceToGuess = sequences.slice();
          startFlashing();
        }, 1000);
      }, 2000);
    }
  } else {
    // Loss
    showPopup("Game Over");
    roundCounter = 0;
    roundCounterElement.innerHTML = `Round <br> ${roundCounter}`;
    scoreCounter = 0;
    scoreCounterElement.innerHTML = `Score <br> ${scoreCounter}`;
    setTimeout(() => {
      // Reset arrays
      sequences = [];
      sequenceToGuess = [];
      hidePopup();
      // starting flashing
      sequences = [createStep()]; // updating the 'sequences' array
      sequenceToGuess = sequences.slice();
      startFlashing();
    }, 2000);
  }
};

// Variable tracking whether the game has started
let gameStarted = false;

// Event handler for the "Start" button callback function
document.getElementById("btnStart").addEventListener("click", () => {
  if (!gameStarted) {
    // if gameStarted is false the game is not started
    gameStarted = true; // the game is started
    roundsCounter();
    scoresCounter();
  }
  setTimeout(() => {
    startFlashing();
  }, 2000);
});

window.onload = () => {
  maxRecordCounter = parseInt(localStorage.getItem("maxRecordCounter")) || 0;
  recordCounterElement.innerHTML = `Record <br> ${maxRecordCounter}`;
};
