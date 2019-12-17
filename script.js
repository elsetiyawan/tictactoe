// global variable
let board = [];
// let squares;
const messages = document.querySelector('h3');
let turn = 'X';
let win;

let winningCombos = [];



// // event listener list
// // change column value
document.getElementById('rowcount').addEventListener('change', changeSquare);

function reset(){
    win = null;
    init()
}

function clickSquare(e) {
    if (!win) {
        if(!e.textContent){
            handleTurn()
        }else{
            alert('Coloumn has been selected')
        }
    }
}

function changeSquare(e) {
    let value = e.target.value
    if (value <= 100) {
        processChangeSquare(value)
    } else {
        alert('Sorry because of the render issue, we limit the square into 45')
    }
}

function processChangeSquare(value) {
    const initialBoard = document.createElement('div');
    initialBoard.classList.add("flex-container");
    initialBoard.style.flexWrap = "wrap";
    initialBoard.id = "board";

    // square
    // initial square
    const initialSquare = document.createElement('div');
    initialSquare.classList.add("square");
    initialSquare.setAttribute("onclick", "clickSquare(this)");

    const totalRow = value * value
    const size = 44 * value;
    initialBoard.style.height = size + "px";
    initialBoard.style.width = size + "px";
    for (let i = 0; i < totalRow; i++) {
        initialBoard.innerHTML += initialSquare.outerHTML
    }

    replaceSquare(initialBoard)
}

function replaceSquare(initialBoard) {
    let item = document.getElementById("boardGame")
    item.replaceChild(initialBoard, item.childNodes[1]);
    init()
}


function init() {
    const row = Array.from(document.querySelectorAll('#board div'));
    board = []
    for (let x = 0; x < row.length; x++) {
        board.push('')
    }
    setWinningCombos()
    render();
};


function setWinningCombos() {
    const row = document.getElementById('rowcount').value
    const totalRow = row * row
    const winner = []
    // horizontal combo
    let count = 0
    for (let x = 0; x < row; x++) {
        let container = []
        for (let i = 0; i < row; i++) {
            container.push(count)
            count++
        }
        winner.push(container)
    }

    // vertical combo
    for (let x = 0; x < row; x++) {
        let hitung = x
        let vertCombo = []
        for (let i = 0; i < row; i++) {
            vertCombo.push(hitung)
            hitung += parseInt(row)
        }
        winner.push(vertCombo)
    }

    // right cross
    let rightCross = []
    let leftCross = []
    let countRightCross = 0
    let countLeftCross = 0
    for (let x = 0; x < row; x++) {
        countLeftCross += parseInt(row)-1
        leftCross.push(countLeftCross)
        rightCross.push(countRightCross)
        countRightCross += parseInt(row)+1
    }
    winner.push(rightCross)
    winner.push(leftCross)

    winningCombos = winner
}


function render() {
    const squares = Array.from(document.querySelectorAll('#board div'));
    board.forEach(function (mark, index) {
        squares[index].textContent = mark;
    });
    messages.textContent = win === 'T' ? `That's a tie, queen!` : win ? `${win} wins the game!` : `It turns for ${turn}`;
};

function handleTurn() {
    const squares = Array.from(document.querySelectorAll('#board div'));
    let idx = squares.findIndex(function (square) {
        return square === event.target;
    });
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    render();
};

function getWinner() {
    let winner = null;
    winningCombos.forEach(function (combo, index) {
        let winnerContainer = []
        combo.forEach(function (x, ind) {
            winnerContainer.push(board[x])
        })
        if (winnerContainer.every((val, i, arr) => val != '' && val === arr[0]))
            winner = board[combo[0]];
    });
    return winner ? winner : board.includes('') ? null : 'T';
};


init();
