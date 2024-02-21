let counter = 0;
let gameBoxes = document.querySelectorAll("#playBox .box");

// Function to handle click event on game boxes
function clickOnBox(event) {
  if (counter % 2 == 0) {
    event.target.innerHTML = "O";
  } else {
    event.target.innerHTML = "X";
  }
  // Check if there is a winner
  if (winnerGame()) {
    for (let gameBox of gameBoxes) {
      gameBox.removeEventListener("click", clickOnBox);
    }
    // Display winner message
    if (counter % 2 == 0) {
      showPopup("O is winner");
      setTimeout(() => {
        hidePopup();
      }, 2000);
    } else {
      showPopup("X is winner");
      setTimeout(() => {
        hidePopup();
      }, 2000);
    }
  } else if (counter == 8) {
    showPopup("Draw");
    setTimeout(() => {
      hidePopup();
    }, 2000);
  }
  counter++;
  event.target.removeEventListener("click", clickOnBox);
}
// Function to start the game
function startGame() {
  counter = 0;
  for (let gameBox of gameBoxes) {
    gameBox.innerHTML = "";
    gameBox.addEventListener("click", clickOnBox);
  }
}
// Function to check if there is a winner
function winnerGame() {
  let options = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let option of options) {
    if (
      gameBoxes[option[0]].innerHTML == gameBoxes[option[1]].innerHTML &&
      gameBoxes[option[1]].innerHTML == gameBoxes[option[2]].innerHTML &&
      gameBoxes[option[2]].innerHTML != ""
    ) {
      return true;
    }
  }
  return false;
}

const wrapper = document.getElementById("wrapper");
const popupMessageElement = document.getElementById("popupMessage");

// Function to display popup message
const showPopup = (message) => {
  popupMessageElement.innerHTML = message;
  wrapper.style.display = "block";
};
// Function to hide popup message
const hidePopup = () => {
  wrapper.style.display = "none";
};
