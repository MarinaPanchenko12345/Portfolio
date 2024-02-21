import { addUserToTable } from "./usersTable.js";
import { UserValidator } from "./UserValidator.js";

const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const user = {
    fname: event.target.form["fname"].value,
    lname: event.target.form["lname"].value,
    email: event.target.form["email"].value,
    password: event.target.form["password"].value,
    isLogIn: "disconnect",
  };

  if (UserValidator.validateUser(user)) {
    addUserToTable(user);
    event.target.form["fname"].value = "";
    event.target.form["lname"].value = "";
    event.target.form["email"].value = "";
    event.target.form["password"].value = "";
  } else {
    alert("incorrect input");
  }
});
