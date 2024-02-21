// Updates the local storage with the current items in the cart
function updateLocalStorage() {
  let items = [];
  let rows = cartTableBody.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let imgSrc = row.querySelector(".item-img").src;
    let itemName = row.querySelector(".item-title").innerText;
    let itemPrice = row.querySelector(".item-price").innerText;
    let itemQty = row.querySelector(".item-qty").value;
    items.push({
      imgSrc: imgSrc,
      itemName: itemName,
      itemPrice: itemPrice,
      itemQty: itemQty,
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(items));
}
// Loads cart items from local storage when the window is fully loaded
window.onload = function () {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.forEach(function (item) {
    addToCartAndUpdate(item.imgSrc, item.itemName, item.itemPrice);
    let newRow = cartTableBody.lastElementChild;
    newRow.querySelector(".item-qty").value = item.itemQty;
    let subtotal =
      parseFloat(item.itemPrice.replace("$", "")) * parseFloat(item.itemQty);
    newRow.querySelector(".sub-total").innerText = "$" + subtotal;
  });
  updateGrandTotal();
};
