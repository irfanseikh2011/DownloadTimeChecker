const plusButton = document.getElementById("but-plus");
const minusButton = document.getElementById("but-minus");
const speedInput = document.getElementById("speed-input");
const selectSpeed = document.getElementById("selectSpeed");

const filePlusButton = document.getElementById("file-but-plus");
const fileMinusButton = document.getElementById("file-but-minus");
const fileInput = document.getElementById("file-input");
const selectFile = document.getElementById("selectFile");

const calculateButton = document.getElementById("but-cal");
const calculationDiv = document.getElementById("calculate");
const cardDiv = document.getElementById("cardCalculate");

let count = 0;
speedInput.value = count;
fileInput.value = count;

function plusScore() {
  speedInput.value++;
  console.log("click");
}

function minusScore() {
  if (speedInput.value > 0) {
    speedInput.value--;
    console.log("click");
  } else {
    console.log("Cannot subtract");
  }
}

function plusScoreFile() {
  fileInput.value++;
  console.log("click");
}

function minusScoreFile() {
  if (fileInput.value > 0) {
    fileInput.value--;
    console.log("click");
  } else {
    console.log("Cannot subtract");
  }
}

function getSpeed() {
  return speedInput.value;
}

function getFileSize() {
  return fileInput.value;
}

function getSelectSpeed() {
  return selectSpeed.value;
}

function getSelectFile() {
  return selectFile.value;
}

function timeCalculator(result) {
  let time = "";
  let day = 0;
  let min = 0;
  let hour = 0;
  let sec = 0;

  if (result <= 60) {
    sec = result;
    time = sec + " secs";
    return time;
  }

  if (result >= 60 && result <= 3600) {
    min = Math.floor(result / 60);
    result /= 60;
    result = result.toFixed(2);
    sec = (result + "").split(".")[1];
  }

  if (result >= 3600) {
    hour = Math.floor(result / 3600);
    result /= 3600;
    result = result.toFixed(4);
    console.log(result);
    min = (result + "").split(".")[1];
    sec = min % 100;
    min = Math.floor(min / 100);
  }

  if (hour >= 24) {
    day = hour / 24;
    day = Math.round(day);
    console.log(day + "days");
    time = day + " Days";
  } else if (hour) {
    time = hour + " hrs " + min + " mins " + sec + " secs";
  } else if (min) {
    time = min + " mins " + sec + " secs";
  } else {
    sec + " secs";
  }

  return time;
}

function getTotalTime() {
  let speed = getSpeed() / 8;
  let file = getFileSize();
  let speedType = getSelectSpeed();
  let fileType = getSelectFile();
  let result = 0;

  if (speedType === "Kbp/s" && fileType === "mb") {
    file = file * 1024;
    result = file / speed;
    result = timeCalculator(result);
    console.log(result);
  } else if (speedType === "Kbp/s" && fileType === "gb") {
    file = file * (1024 * 1024);
    result = file / speed;
    result = timeCalculator(result);
  } else if (speedType === "Kbp/s" && fileType === "tb") {
    file = file * (1024 * 1024 * 1024);
    result = file / speed;
    result = timeCalculator(result);
  }

  return result;
}

plusButton.addEventListener("click", plusScore);
minusButton.addEventListener("click", minusScore);
filePlusButton.addEventListener("click", plusScoreFile);
fileMinusButton.addEventListener("click", minusScoreFile);

let speedDetail = document.createElement("h6");
let fileDetail = document.createElement("h6");
let timeDetail = document.createElement("h5");
let calCount = 0;

calculateButton.addEventListener("click", function () {
  if (getSpeed() != 0 && getFileSize() != 0) {
    calculationDiv.style.display = "block";
  }
  speedDetail.textContent =
    "Your internet speed = " + getSpeed() + " " + getSelectSpeed();

  fileDetail.textContent =
    "Your file size = " + getFileSize() + " " + getSelectFile();

  timeDetail.textContent =
    "Total time required to download the file = " + getTotalTime();

  if (calCount === 0) {
    cardDiv.appendChild(speedDetail);
    cardDiv.appendChild(fileDetail);
    cardDiv.appendChild(timeDetail);
    calCount++;
  } else {
    speedDetail.textContent =
      "Your internet speed = " + getSpeed() + " " + getSelectSpeed();
    fileDetail.textContent =
      "Your file size = " + getFileSize() + " " + getSelectFile();
    timeDetail.textContent =
      "Total time required to download the file = " + getTotalTime();
  }
});
