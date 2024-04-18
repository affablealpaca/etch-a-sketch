let sketchbox = document.querySelector(".sketch-box");
let addGridvalue = document.querySelector("#add-Gridvalue");
let colorButtons = document.querySelectorAll(".btnColors");

let selectedColor = "black";
let isDrawing = false;
let currentGridSize = 16;

document.addEventListener("DOMContentLoaded", () => {
  createSketch(16);
  updateDrawStatus();
});

document.querySelector("body").addEventListener("click", function (e) {
  if (e.target.tagName !== "BUTTON") {
    isDrawing = !isDrawing;
    updateDrawStatus();
  }
});

function updateDrawStatus() {
  const statusArea = document.querySelector(".status-area");

  if (isDrawing) {
    statusArea.textContent = "YOU ARE DRAWING";
  } else {
    statusArea.textContent = "YOU ARE NOT DRAWING";
  }
}

addGridvalue.addEventListener("click", checkValue);

colorButtons.forEach((button) => {
  button.addEventListener("click", changeColor);
});

function changeColor(event) {
  if (
    event.target.classList.contains("btnColors") &&
    event.target.tagName === "BUTTON"
  ) {
    let clickedButton = event.target;
    let color = clickedButton.dataset.color;

    switch (color) {
      case "red":
        selectedColor = "#ff0000";
        console.log("TEST");
        break;
      case "green":
        selectedColor = "#3cb371";
        break;
      case "blue":
        selectedColor = "#0000ff";
        break;
      case "black":
        selectedColor = "#000000";
        break;
      case "random":
        selectedColor = "random";
        break;
      case "eraser":
        const bodyStyle = getComputedStyle(document.body);
        selectedColor = bodyStyle.backgroundColor;
        break;
      case "reset":
        createSketch(currentGridSize);
        break;
      default:
        console.log("Invalid color or functionality not implemented");
    }
  }
  const colorStatus = document.getElementById("color-status");
  const buttonText = event.target.textContent.trim(); // Get button text
  colorStatus.textContent = `Color: ${buttonText}`;
}

function draw() {
  let columns = document.getElementsByClassName("column");
  for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener("mouseover", function () {
      if (isDrawing) {
        if (selectedColor === "random") {
          this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else {
          this.style.backgroundColor = selectedColor;
        }
        // Increase opacity by 0.1 or set to 1 if already close (applied to both cases)
        this.style.opacity = Math.min(parseFloat(this.style.opacity) + 0.1, 1);
      }
    });
  }
}

function createSketch(size) {
  let sketchbox = document.querySelector(".sketch-box");
  sketchbox.innerHTML = "";

  for (let i = 0; i < size; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    sketchbox.appendChild(row);
    for (let k = 0; k < size; k++) {
      let column = document.createElement("div");
      column.classList.add("column");
      column.style.opacity = 0; // Set initial opacity to 0
      row.appendChild(column);
    }
  }
  draw();
}

function checkValue() {
  let currentValue = prompt("Enter a number between 2 and 99:", "16");

  if (!currentValue) {
    alert("Please enter a valid number between 2 and 99.");
    return;
  }

  currentValue = parseInt(currentValue);

  if (isNaN(currentValue) || currentValue < 2 || currentValue > 99) {
    alert("Invalid input. Please enter a number between 2 and 99.");
    return;
  }

  currentGridSize = currentValue;
  createSketch(currentValue);
}
