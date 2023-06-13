//Constants / Global variables


//Object that contains function that start the game
const startGame = {
    init: init,
    playerNames: getPlayerNames,
    hidePlayer: hidePlayerForm,
    hideBoard: hideBoard,
    addBoard: addBoard,
    setPlayerNames: setPlayerNames,
    initializeGame: initializeGame,
    renderBoard: renderBoard,
    renderMessage: renderMessage,
    renderControls: renderControls,
}

//Board colors
const COLORS = {
    '0': 'grey',
    '1': 'white', 
    '-1': 'purple'
};

// Variables tracking state
let board;
let turn = 1;
let winner = null; 

// Store elements on the page that will be accessed in code more than once in variables:
const squares = document.querySelectorAll('#board div');


//Player 1 Object
const player1 = {
    name: '',
}

//Player 2 Object
const player2 = {
    name: '',
}

// Array of winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function initializeGame() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    
    turn = 1;
    winner = null;
    render();
}

function render() {
    renderBoard();
    renderMessage();
    renderControls();
  }

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        // Iterate over the cells in the cur column (colArr)
        colArr.forEach(function(cellVal, rowIdx) {
          const cellId = `c${colIdx}r${rowIdx}`;
          const cellEl = document.getElementById(cellId);
          cellEl.style.backgroundColor = COLORS[cellVal];
        });
      });
    }

function renderControls() {
    // console.log('renderMessage Works')
}
function renderMessage() {
//Need to hide and unhide once message pops up
    const message = document.getElementById('message');

    if (winner !== null) 
    {
      if (winner === 'T') 
      {
        message.textContent = 'It\'s a tie!';
      } 
      else if(winner === 'W')
      {
        const player = winner === 1 ? `${player1.name}` : `${player2.name}`;
        message.textContent = `Player ${player} wins!`;
      }
      else if(winner === 'L')
      {
        const player = winner === 1 ? `${player1.name}` : `${player2.name}`;
        message.textContent = `Player ${player} wins!`;
      }
      else
      {
          const player = turn === 1 ? `${player1.name}` : `${player2.name}`;
          message.textContent = `Current turn: ${player1.name}`;
      }
    }
    else
    {
        const player = turn === 1 ? `${player1.name}` : `${player2.name}`;
        message.textContent = `Current turn: ${player1.name}`;
    }
}


function checkWin() {
    for (const combination of winningCombinations) {
      const [comb1, comb2, comb3] = combination;
      const cell1 = board[Math.floor(comb1 / 3)][comb1 % 3];
      const cell2 = board[Math.floor(comb2 / 3)][comb2 % 3];
      const cell3 = board[Math.floor(comb3 / 3)][comb3 % 3];
  
      if (cell1 !== 0 && cell1 === cell2 && cell2 === cell3) {
        winner = cell1 === 1 ? 'W' : 'L';
        renderBoard();
        return; // Exit the function early if a winner is found
      }
    }
  
    checkTie();
}
  

function checkTie() {
    if (board.includes('0') && winner === null) 
    {
      winner = 'T';
      renderBoard();
    }
    console.log(turn);
}

function squareElClick(event) {
    renderMessage();
    const square = event.target;
    // console.log(square)
    square.classList.remove('cell');
    square.classList.add('cell2');
    const squareIndex = square.id;
    console.log(squareIndex);
    const columnNumber = parseInt(squareIndex.charAt(1));
    const rowNumber = parseInt(squareIndex.charAt(3));

    if (board[columnNumber][rowNumber] === 0 && turn === 1) 
    {
        board[columnNumber][rowNumber] = 1;
        event.target.textContent = 'X';
    }
    else if(board[columnNumber][rowNumber] === 0 && turn === -1)
    {
        board[columnNumber][rowNumber] = -1;
        event.target.textContent = 'O';
    }
    console.log(turn);
    renderBoard();
    checkWin();
    checkTie();
  
    // Toggle the turn
    turn *= -1;
    
}

function setPlayerNames() {
    //Obtains the h1 elements for the names
    const headerName1 = document.querySelector('#displayName');
    const headerName2 = document.querySelector('#displayName2');

    //Removes hidden, adds a class
    headerName1.classList.remove('playerName');
    headerName1.classList.add('hidden');

    //Removes hidden, adds a class
    headerName2.classList.remove('playerName');
    headerName2.classList.add('hidden');

    //Hides the Form
    const playerForm = document.querySelector('#playerForm');
    playerForm.classList.remove('hidden');
    playerForm.classList.add('playerForm');

    const restBtn = document.querySelector('#restart');
    restBtn.classList.remove('btns');
    restBtn.classList.add('hidden');

    const message = document.getElementById('message');
    message.classList.remove('something');
    message.classList.add('hidden');
}

//Hide Player Form
function hidePlayerForm() {
    //Obtains the h1 elements for the names
    const headerName1 = document.querySelector('#displayName');
    const headerName2 = document.querySelector('#displayName2');

    //Removes hidden, adds a class
    headerName1.classList.remove('hidden');
    headerName1.classList.add('playerName');

    //Removes hidden, adds a class
    headerName2.classList.remove('hidden');
    headerName2.classList.add('playerName');

    //Adds values to h1
    headerName1.innerHTML = player1.name;
    headerName2.innerHTML = player2.name;

    //Hides the Form
    const playerForm = document.querySelector('#playerForm');
    playerForm.classList.remove('playerForm');
    playerForm.classList.add('hidden');
}

//Obtains names from the input values
function getPlayerNames(event) {
    //Prevents parent event handler
    event.preventDefault()
    //Obtains button
    const startBtn = document.getElementById('startGameBtn')
    //Obtains p1 & p2 text inputs
    const playerName= document.querySelector('#p1');
    const playerName2 = document.querySelector('#p2');
    //Adds names to player objects
    player1.name = playerName.value ? playerName.value : 'player 1';
    player2.name = playerName2.value ? playerName2.value : 'player 2' ;
    //Resets input values
    playerName.value = '';
    playerName2.value = '';
    //Hides Form and adds names to h1 player elements
    startGame.hidePlayer();
    startGame.addBoard();

}

//Hides the boardgame while the user inputs information
function hideBoard() {
    //Obtains the board
    const board = document.getElementById('board');
    //Obtains all divs under the parent board
    const boxes = board.querySelectorAll('div');
    //hides each div element
    boxes.forEach( e => {
        e.classList.remove('cell');
        e.classList.remove('cell2');
        e.classList.remove('cell3');
        e.textContent = '';
        e.classList.add('hidden');
    })

}

function addBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.classList.remove('hidden');
    gameBoard.classList.add('something');
    //Obtains the board
    const board = document.getElementById('board');
    //Obtains all divs under the parent board
    const boxes = board.querySelectorAll('div');
    //hides each div element
    boxes.forEach( e => {
        e.classList.remove('hidden');
        e.classList.add('cell');
    })

    const restBtn = document.getElementById('restart');
    restBtn.classList.remove('hidden');
    restBtn.classList.add('btns');
}

//Definition of the Init function that starts the game
function init() {
    startGame.hideBoard();
    startGame.initializeGame();
    startGame.renderBoard();
}

const replayButton = document.getElementById('restart');
replayButton.addEventListener('click', () => {
  startGame.initializeGame();
  startGame.renderBoard();
  startGame.hideBoard();
  startGame.setPlayerNames();
});

startGame.initializeGame();
startGame.renderBoard();


//Adds functionality to the Player 1 & Player 2 Form
const startBtn = document.getElementById('startGameBtn');
startBtn.addEventListener('click', startGame.playerNames);

startGame.hideBoard();

boardOfSquares = document.querySelector('#board');
boardOfSquares.addEventListener('click', squareElClick);
console.log(turn);
