let currentPlayer = 'X';
let cellCount = 0;
let isGameOver = false;

function initGame() {
  currentPlayer = 'X';
  cellCount = 0;
  isGameOver = false;
  document.querySelector('.winner').innerHTML = '';
}

function createElement(id, item) {
  document.getElementById(id).innerHTML = item;
}

function onButtonClick() {
  initGame();
  for (let i = 1; i <= 9; i++){
    createElement(i, "");
  }
}

function getElementArray() {
  const items = [];
  for(let i = 1; i <= 9; i++) {
    let item = document.getElementById(i).innerHTML;
    items.push(item);
  }
  return items;
}

function isSameAll(cell, i, j, k) {
  if (cell[i] === "") return false;
  return cell[i] === cell[j] && cell[j] === cell[k];
}

function checkWins() {
  const cells = getElementArray();
  if (
    cells[0] === cells[1] && cells[1] === cells[2] && cells[0] !== "" ||
    cells[3] === cells[4] && cells[4] === cells[5] && cells[3] !== "" ||
    cells[6] === cells[7] && cells[7] === cells[8] && cells[6] !== "" ||
    cells[0] === cells[3] && cells[3] === cells[6] && cells[0] !== "" ||
    cells[1] === cells[4] && cells[4] === cells[7] && cells[1] !== "" ||
    cells[2] === cells[5] && cells[5] === cells[8] && cells[2] !== "" ||
    cells[0] === cells[4] && cells[4] === cells[8] && cells[0] !== "" ||
    cells[2] === cells[4] && cells[4] === cells[6] && cells[2] !== "" 
  ) {
    return true;
  }
  return false;
}

function endingMsg(msg) {
  document.querySelector('.winner').innerHTML = msg;
  isGameOver = true;
}

function changeTurn() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
}

function checkCell(event) {
  if (isGameOver) {
    return;
  }

  let item = event.target.id;
  let value = event.target.innerHTML;
  if (value == "") {
    createElement(item, currentPlayer);
    cellCount++;
    if(checkWins()) {
      endingMsg(`${currentPlayer}'s won!`);
    } else if (cellCount === 9) {
      endingMsg('Draw!!');
    }
    changeTurn(); 
  } 
}

function setEventListener() {
  const reset = document.querySelector('button');
  const cells = document.querySelector('.board');
  reset.addEventListener('click', () => onButtonClick());
  cells.addEventListener('click', event => checkCell(event));
}

setEventListener();
