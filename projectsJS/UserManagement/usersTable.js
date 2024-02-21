const usersTable = document.querySelector(".users-table");
let users = [];
// Function to add a user to the table
export function addUserToTable(user) {
  users.push(user);
  console.log(users);

  // Inserts a new row into the users table
  let row = usersTable.insertRow();
  // Iterates over each property in the user object
  for (let key in user) {
    let cell = row.insertCell();
    cell.textContent = user[key];
  }
  localStorage.setItem("users", JSON.stringify(users));

  // Adds buttons to the new row for disconnecting and deleting the user
  let buttonsCell = row.insertCell();
  let disconnectButton = document.createElement("button");

  disconnectButton.className = "btn btn-warning";
  disconnectButton.textContent = "התנתקות";
  buttonsCell.appendChild(disconnectButton);
  let deleteButton = document.createElement("button");

  deleteButton.className = "btn btn-danger";
  deleteButton.textContent = "מחיקה";
  buttonsCell.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    let rowIndex = row.rowIndex;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    usersTable.deleteRow(rowIndex);
    users.splice(rowIndex - 1, 1);
    localStorage.setItem("users", JSON.stringify(users));
  });

  disconnectButton.addEventListener("click", () => {
    const rowIndex = row.rowIndex;
    users[rowIndex - 1].isLogIn = "disconnect";
    row.cells[row.cells.length - 2].textContent = "disconnect";
  });
}
// Function to handle actions when the window finishes loading
window.onload = function () {
  const savedUsersString = localStorage.getItem("users");
  if (savedUsersString) {
    const savedUsers = JSON.parse(savedUsersString);
    savedUsers.forEach((user) => {
      addUserToTable(user);
    });
  }
};
// Function to handle login attempts
const loginButton = document.querySelector("#submitBtn2");
loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const loginEmail = document.querySelector("#login-email").value;
  const loginPassword = document.querySelector("#password2").value;

  const user = users.find(
    (user) => user.email === loginEmail && user.password === loginPassword
  );
  if (user) {
    user.isLogIn = "connect";
    const rowIndex = users.indexOf(user);
    usersTable.rows[rowIndex + 1].cells[
      usersTable.rows[rowIndex + 1].cells.length - 2
    ].textContent = "connected";
  } else {
    console.log("Incorrect email or password");
  }
  document.querySelector("#login-email").value = "";
  document.querySelector("#password2").value = "";
});
