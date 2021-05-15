let currentPlayer = 'X';
let cellCount = 0;
let isGameOver = false;
const array = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


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
  for (const arr of array) {
    if(isSameAll(cells, arr[0], arr[1], arr[2])) {
      return true;
    }
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
