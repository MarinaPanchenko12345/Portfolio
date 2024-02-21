let element = document.querySelector("#element");
let addButton = document.getElementById("btnAdd");
let saveButton = document.getElementById("btnSave");
let clearButton = document.getElementById("btnClear");
let restoreButton = document.getElementById("btnRestore");

// Append and create labels, inputs amd inputs id to the box1
let box1 = document.querySelector(".box1");
const inputParams1 = [
  { label: "Width Element(px)", placeholder: "enter a width" },
  { label: "Height of Element(px)", placeholder: "enter a height" },
  { label: "Margin Top(px)", placeholder: "enter a margin" },
  { label: "Margin Bottom(px)", placeholder: "enter a margin" },
  { label: "Margin Left(px)", placeholder: "enter a margin" },
  { label: "Margin Right(px)", placeholder: "enter a margin" },
  { label: "Border Radius(%)", placeholder: "enter a radius" },
  { label: "Border(px)", placeholder: "enter a size" },
  { label: "Border Color", placeholder: "enter a color" },
  { label: "Element rotation(&deg;)", placeholder: "enter a degree" },
];
inputParams1.forEach((params, index) => {
  let label = document.createElement("label");
  label.innerHTML = params.label;
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = params.placeholder;
  input.id = "input1" + index;
  box1.appendChild(label);
  box1.appendChild(input);
});
// Append and create labels, inputs amd inputs id to the box2
let box2 = document.querySelector(".box2");
const inputParams2 = [
  { label: "Font size(rem)", placeholder: "enter a font size" },
  { label: "Font Family", placeholder: "enter a font family" },
  { label: "Top(px)", placeholder: "enter a margin" },
  { label: "Bottom(px)", placeholder: "enter a margin" },
  { label: " Left(px)", placeholder: "enter a margin" },
  { label: "Right(px)", placeholder: "enter a margin" },
];
inputParams2.forEach((params, index) => {
  let label = document.createElement("label");
  label.innerHTML = params.label;
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = params.placeholder;
  input.id = "input2" + index;
  box2.appendChild(label);
  box2.appendChild(input);
});
function changeBgColor(color) {
  element.style.backgroundColor = color.value;
}
function changeFontColor(color) {
  element.style.color = color.value;
}
function changeColors() {
  changeBgColor(bgColor);
  changeFontColor(fontColor);
}
function changeRotation() {
  let elementRotation = document.getElementById("input19").value;
  element.style.transform = "rotate(" + elementRotation + "deg)";
}
// Function to apply user changes based on user input
function userChange() {
  let fcElementColor = document.getElementById("fontColor").value;
  element.style.color = fcElementColor;

  let textElement = document.getElementById("textElement").value;
  element.textContent = textElement;
  element.style.textAlign = "center";

  let widthElement = document.getElementById("input10").value;
  element.style.width = widthElement + "px";

  let heightElement = document.getElementById("input11").value;
  element.style.height = heightElement + "px";

  let marginTopElement = document.getElementById("input12").value;
  element.style.marginTop = marginTopElement + "px";

  let marginBottomElement = document.getElementById("input13").value;
  element.style.marginBottom = marginBottomElement + "px";

  let marginLeftElement = document.getElementById("input14").value;
  element.style.marginLeft = marginLeftElement + "px";

  let marginRightElement = document.getElementById("input15").value;
  element.style.marginRight = marginRightElement + "px";

  let borderRadiusElement = document.getElementById("input16").value;
  element.style.borderRadius = borderRadiusElement + "%";

  let borderElement = document.getElementById("input17").value;
  element.style.borderWidth = borderElement + "px";
  element.style.borderStyle = "solid";

  let borderColor = document.getElementById("input18").value;
  element.style.borderColor = borderColor;

  let fontSizeText = document.getElementById("input20").value;
  element.style.fontSize = fontSizeText + "rem";

  let fontFamilyText = document.getElementById("input21").value;
  element.style.fontFamily = fontFamilyText;

  let marginTopText = document.getElementById("input22").value;
  document.getElementById("element").style.paddingTop = marginTopText + "px";

  let marginBottomText = document.getElementById("input23").value;
  document.getElementById("element").style.paddingBottom =
    marginBottomText + "px";

  let marginLeftText = document.getElementById("input24").value;
  document.getElementById("element").style.paddingLeft = marginLeftText + "px";

  let marginRightText = document.getElementById("input25").value;
  document.getElementById("element").style.paddingRight =
    marginRightText + "px";

  let underlineCheckbox = document.getElementById("underlineCheckbox");
  let upperCaseCheckbox = document.getElementById("upperCaseCheckbox");

  if (underlineCheckbox.checked) {
    element.style.textDecoration = "underline";
  } else {
    element.style.textDecoration = "none";
  }

  if (upperCaseCheckbox.checked) {
    element.style.textTransform = "uppercase";
  } else {
    element.style.textTransform = "none";
  }
}
addButton.addEventListener("click", () => {
  userChange();
  changeColors();
  changeRotation();
});

const localKeys = [
  "bgColor",
  "fontColor",
  "textElement",
  "underlineCheckbox",
  "upperCaseCheckbox",
  "input10",
  "input11",
  "input12",
  "input13",
  "input14",
  "input15",
  "input16",
  "input17",
  "input18",
  "input19",
  "input20",
  "input21",
  "input22",
  "input23",
  "input24",
  "input25",
];
// Function to save user input to local storage
function saveItemsToLS() {
  localKeys.forEach((key) => {
    const element = document.getElementById(key);
    localStorage.setItem(key, element.value);
  });
  alert("Changes saved!");
}
saveButton.addEventListener("click", saveItemsToLS);
// Function to clear all from local storage
function clearAll() {
  localStorage.clear();
  alert("All data cleared!");
  document.getElementById("textElement").value = "";
  const inputElements = document.querySelectorAll(".box1 input, .box2 input");
  inputElements.forEach((input) => {
    if (input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
  element.style = "";
  element.textContent = "";
}
clearButton.addEventListener("click", clearAll);
// Function to restore values from local storage and apply them to the page
function restoreValue() {
  localKeys.forEach((key) => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      const element = document.getElementById(key);

      if (element.type === "checkbox") {
        element.checked = storedValue === "true";
      } else {
        element.value = storedValue;
      }
    }
  });
  userChange();
  changeColors();
  changeRotation();
}
//Saved values from local storage when the window loads
window.onload = function () {
  restoreValue();
};
