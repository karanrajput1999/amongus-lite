const imposter = document.querySelector(".imposter");
const rows = document.querySelectorAll(".row");
const columns = document.querySelectorAll(".column");
const lives = document.querySelector(".lives");
const info = document.querySelector(".info");
const startBtn = document.querySelector(".btn");
const modal = document.querySelector(".modal-container");
const resultModal = document.querySelector(".result-container");
const resultInfo = document.querySelector(".result-info");
const resultImg = document.querySelector(".result-img");
const restartGame = document.querySelector(".restart-btn");

let totalCaught = 0;
let remainingLives = 4;
let rowNo = 8;
let colNo = 4;
const charImages = ["blue", "green", "pink", "cyan"];

let positions = [];

function game() {
  function randomNums() {
    const rowNum = Math.floor(Math.random() * 8);
    const colNum = Math.floor(Math.random() * 9);
    randomPosition(rowNum, colNum);
  }

  function randomPosition(rowNum, colNum) {
    let tempColsAndRows = [];
    let duplicatePosition = false;

    tempColsAndRows.push(rowNum, colNum);

    // checks if an array of same row and column already exists inside positions
    positions.forEach((el) => {
      if (el.every((val, index) => val === tempColsAndRows[index])) {
        duplicatePosition = true;
      }
    });

    // if an array with duplicate positions exist stop the execution of code and generate the random row and column again
    if (duplicatePosition) {
      randomNums();
      return;
    }

    positions.push(tempColsAndRows);
  }

  for (let i = 0; i < 8; i++) {
    randomNums();
  }

  // character's position based on the first four positions inside position array
  function renderCharacter() {
    for (let i = 0; i < 4; i++) {
      const [row, col] = positions[i];
      let charImage = `<img src="./assets/${charImages[i]}.png" width="30" height="40" data-type="character" data-color="${charImages[i]}"/>`;
      rows[row].children[col].insertAdjacentHTML("beforeend", charImage);
    }
  }
  renderCharacter();

  // police position based on the last four positions inside position array
  function renderPolice() {
    for (let i = 4; i < 8; i++) {
      const [row, col] = positions[i];

      let policeImage = `<img src="./assets/police.png" width="30" height="40" data-type="police"/>`;
      rows[row].children[col].insertAdjacentHTML("beforeend", policeImage);
    }
  }
  renderPolice();

  function handleEvent(rowNo, colNo) {
    if (rows[rowNo].children[colNo].innerHTML === "") {
      rows[rowNo].children[colNo].classList.add("empty");
    } else {
      const el = rows[rowNo].children[colNo].querySelector("img");
      if (el.getAttribute("data-type") === "police") {
        rows[rowNo].children[colNo].classList.add("caught");
        handleLifeHeart();
        el.style.opacity = 1;
      } else {
        const elColor = rows[rowNo].children[colNo].querySelector("img");
        const color = elColor.getAttribute("data-color");
        rows[rowNo].children[colNo].classList.add("killed");
        rows[rowNo].children[
          colNo
        ].children[0].src = `./assets/${color}-dead.png`;
        elColor.style.opacity = 1;
      }
    }
  }

  // this function resolves a bug where when you move the imposter from it's starting position it's innerHTML is set to null which causes the bug
  function resetRow9() {
    const row9 = document.querySelector(".row-9");
    row9.children[4].innerHTML = "";
  }

  function hide() {
    columns.forEach((element) => {
      const imgs = element.querySelector("img");
      if (imgs) {
        const type = imgs.getAttribute("data-type");
        if (type === "imposter") {
          return;
        } else {
          imgs.style.opacity = 0;
        }
      }
    });
  }

  function timer() {
    setTimeout(() => {
      // calls the function to hide all the characters and police
      hide();

      // character control
      window.addEventListener("keydown", (e) => {
        resetRow9();

        if (e.key === "ArrowUp") {
          if (rowNo < 1) {
            return;
          }
          rowNo = rowNo - 1;
          handleEvent(rowNo, colNo);
          rows[rowNo].children[colNo].appendChild(imposter);
          gameOver();
        } else if (e.key === "ArrowDown") {
          if (rowNo > 7) {
            return;
          }
          rowNo = rowNo + 1;
          handleEvent(rowNo, colNo);
          rows[rowNo].children[colNo].appendChild(imposter);
          gameOver();
        } else if (e.key === "ArrowRight") {
          if (colNo > 7) {
            return;
          }
          colNo = colNo + 1;
          handleEvent(rowNo, colNo);
          rows[rowNo].children[colNo].appendChild(imposter);
          gameOver();
        } else if (e.key === "ArrowLeft") {
          if (colNo < 1) {
            return;
          }
          colNo = colNo - 1;
          handleEvent(rowNo, colNo);
          rows[rowNo].children[colNo].appendChild(imposter);
          gameOver();
        }
      });
    }, 5000);
  }
  timer();
}

function handleLifeHeart() {
  totalCaught = document.querySelectorAll(".caught").length;
  console.log(totalCaught);
  const lifeToRemove = lives.children[totalCaught - 1];
  lifeToRemove.style.display = "none";
  console.log(lifeToRemove);
}
function gameOver() {
  if (document.querySelectorAll(".caught").length === 4) {
    resultModal.style.display = "grid";
    resultInfo.innerText = "You Lost :(";
    resultInfo.classList.add("lost-info");
    resultImg.src = "./assets/lost.png";
    resultImg.classList.add("lost-img");
  } else if (document.querySelectorAll(".killed").length === 4) {
    resultModal.style.display = "grid";
    resultInfo.innerText = "You Won :)";
    resultInfo.classList.add("win-info");
    resultImg.src = "./assets/win.png";
    resultImg.classList.add("win-img");
  }
}

restartGame.addEventListener("click", () => {
  window.location.reload();
});

startBtn.addEventListener("click", () => {
  modal.style.display = "none";
  game();
});
