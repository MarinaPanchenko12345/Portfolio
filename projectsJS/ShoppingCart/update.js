let cartTableBody = document.getElementsByTagName("tbody")[0];
let quantityInputs = document.getElementsByClassName("item-qty");
let trolley = document.getElementById("myTrolley");

// Updates the quantity and subtotal of an item
function updateQuantity(event) {
  let updatedInput = event.target;
  let parentRow = updatedInput.parentElement.parentElement;

  let itemPriceElement = parentRow.querySelector(".item-price");
  let itemPrice = parseFloat(itemPriceElement.innerText.replace("$", ""));

  let subtotalElement = parentRow.querySelector(".sub-total");
  let quantity = parseInt(updatedInput.value);
  let subtotal = quantity * itemPrice;
  subtotalElement.innerText = "$" + subtotal;

  if (isNaN(quantity) || quantity <= 0) {
    updatedInput.value = 1;
  }
  updateGrandTotal();
}
// Calculates and updates the grand total of the cart
function updateGrandTotal() {
  let total = 0;
  let grandTotalElement = document.getElementsByClassName("grand-total")[0];
  let subtotalElements = document.getElementsByClassName("sub-total");
  for (let i = 0; i < subtotalElements.length; i++) {
    let subtotalAmount = parseInt(
      subtotalElements[i].innerText.replace("$", "")
    );
    total += subtotalAmount;
  }
  grandTotalElement.innerHTML = "$" + total;
  updateLocalStorage();
}
// Updates the visibility of the cart
function updateTrolleyVisibility() {
  if (cartTableBody.getElementsByTagName("tr").length > 0) {
    trolley.style.display = "block";
  } else {
    trolley.style.display = "none";
  }
}
