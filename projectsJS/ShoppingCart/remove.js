let removeButtons = document.getElementsByClassName("btn-danger");

function handleRemoveButtonClick(event) {
  let clickedButton = event.target;
  let parentRow = clickedButton.parentElement.parentElement;
  parentRow.remove();
  updateGrandTotal();
  updateTrolleyVisibility();
}

for (let i = 0; i < removeButtons.length; i++) {
  removeButtons[i].addEventListener("click", handleRemoveButtonClick);
}
