const X_CLASS = 'x'
const CIRCEL_CLASS = 'circel'
const WINNNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMassageElement = document.getElementById('winningMassage')
const winningMassageTextElement = document.querySelector('[data-winning-massage-text]')
const restartButton = document.getElementById('restartButton')
let circelTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circelTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCEL_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {
            once: true
        })
    })
    setBoardHoverClass()
    winningMassageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circelTurn ? CIRCEL_CLASS : X_CLASS;
    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
   
}

function endGame(draw) {

    if (draw) {
        winningMassageTextElement.innerText = 'Ничья!'
    } else {
        winningMassageTextElement.innerText = `${circelTurn ? "O" : "X"} Победили!`
    }

    winningMassageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
         cell.classList.contains(CIRCEL_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circelTurn = !circelTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCEL_CLASS)
    if (circelTurn) {
        board.classList.add(CIRCEL_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}