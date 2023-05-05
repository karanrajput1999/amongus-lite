const imposter = document.querySelector(".imposter");
const row9 = document.querySelector(".row-9");
const rows = document.querySelectorAll(".row");
const columns = document.querySelectorAll(".column");
let rowNo = 8;
let colNo = 5;
const charImages = ["blue", "green", "pink", "cyan"];

let rowsAndcols = [];

function randomNums() {
  const rowNum = Math.floor(Math.random() * 8);
  const colNum = Math.floor(Math.random() * 9);
  generateRowAndCol(rowNum, colNum);
}

function generateRowAndCol(rowNum, colNum) {
  let tempColsAndRows = [];
  let duplicateRowAndCol = false;

  tempColsAndRows.push(rowNum, colNum);

  // checks if an array of same row and column already exists inside rowsAndcols
  rowsAndcols.forEach((el) => {
    if (el.every((val, index) => val === tempColsAndRows[index])) {
      duplicateRowAndCol = true;
      // return;
    }
  });

  // if an array of duplicate row and column exist stop the execution and call randomNums to start the function again
  if (duplicateRowAndCol) {
    randomNums();
    return;
  }

  rowsAndcols.push(tempColsAndRows);
}

for (let i = 0; i < 4; i++) {
  randomNums();
}

function randomRowAndCol() {
  rowsAndcols.forEach(([row, col], i) => {
    let charImage = `<img src="./assets/${charImages[i]}.png" width="30" height="40"/>`;
    rows[row].children[col].insertAdjacentHTML("beforeend", charImage);
  });
}

randomRowAndCol();

// character control
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (rowNo < 1) {
      return;
    }
    rowNo = rowNo - 1;
    rows[rowNo].children[colNo - 1].appendChild(imposter);
  } else if (e.key === "ArrowDown") {
    if (rowNo > 7) {
      return;
    }
    rowNo = rowNo + 1;
    rows[rowNo].children[colNo - 1].appendChild(imposter);
  } else if (e.key === "ArrowRight") {
    if (colNo > 8) {
      return;
    }
    rows[rowNo].children[colNo].appendChild(imposter);
    colNo = colNo + 1;
  } else if (e.key === "ArrowLeft") {
    if (colNo < 2) {
      return;
    }
    rows[rowNo].children[colNo - 2].appendChild(imposter);
    colNo = colNo - 1;
  }
});
