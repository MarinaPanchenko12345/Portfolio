let addToCartButtons = document.getElementsByClassName("btn-primary");

// Function to handle add to cart button click events
function handleAddToCartButtonClick(event) {
  let clickedButton = event.target;
  let productCard = clickedButton.closest(".card");
  let imgSrc = productCard.querySelector(".shop-img").src;
  let itemName = productCard.querySelector(".shop-title").innerText;
  let itemPrice = productCard.querySelector(".shop-price").innerText;
  addToCartAndUpdate(imgSrc, itemName, itemPrice);
  updateLocalStorage();
  updateTrolleyVisibility();
}
// Loop through all add to cart buttons
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", handleAddToCartButtonClick);
}
// Function to add a new row to the cart and update contents
function addToCartAndUpdate(imgSrc, itemName, itemPrice) {
  let newRow = document.createElement("tr");
  newRow.innerHTML = `<td><img src="${imgSrc}" class="item-img"/></td>
              <td><h4 class="item-title mt-4">${itemName}</h4></td>
              <td><h4 class="item-price mt-4">${itemPrice}</h4></td>
              <td><input type="number" class="item-qty mt-4" value="0" /></td>
              <td><h4 class="sub-total mt-4">0 $</h4></td>
              <td><button class="btn btn-danger mt-4">Remove</button></td>`;
  cartTableBody.append(newRow);
  updateLocalStorage();

  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", handleRemoveButtonClick);
  }
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("click", updateQuantity);
  }
  updateGrandTotal();
}
