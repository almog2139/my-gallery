'use srict'
var gBoard;

const MINE = '💣';
const FLAG = '🚩';
const SMILE_STARS = '🙂';
const SMILE_WIN = '🥳';
const SMILE_LOSE = '😡';
var gCountLive = 0;
var gTimer = null;
var gHins = null;
var gElBtnSmile = document.querySelector('.smile');
var gRow;
var gCol;
var gCountSafe = 0;
var gCounterHins = 0;
var gArrUndos = [];
var gMineLocations = [];
var gUserMines;
var gCountMine;
var isUserMine = false;
var gMineLeft;
var countShowMines = 0;
var gBestScoor = Infinity;
var gPopSound = new Audio('pop.wav')
myStorage = window.localStorage;
document.querySelector(".result").innerHTML = localStorage.getItem("best-scoor") + ' seconds';

var gLevel = {
    numberLevel: 0,
    size: 4,
    mines: 3

}
var gGame = {
    isOn: false,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0
}
//var gMineLeft = gLevel.mines;
function initGame() {
    gMineLocations = [];
    var elSec = document.querySelector('h2 span')
    elSec.innerText = 0;
    var elMines = document.querySelector('h3 span')
    elMines.innerText = gLevel.mines;
    gMineLeft = gLevel.mines;
    console.log('init:', gMineLeft);
    gBoard = buildBoard();
    console.log(gBoard);
    renderBoard(gBoard);
    gGame.isOn = true;
    gElBtnSmile.innerText = SMILE_STARS;
    gGame.secsPassed = 0;
    gGame.markedCount = 0;
    gGame.showCount = 0;
    secsPassed = 0;
    clearTimeout(gTimer);


}

function setMinesNegCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            cell.minesAroundCount = countNeighbors(i, j, board);
        }
    }
}
function countNeighbors(cellI, cellJ, board) {
    var countMine = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine === true) countMine++;
        }
    }
    return countMine;
}
function getRandomMine(board) {
    var emptyLocations = getRandomEmpty(board);
    if (emptyLocations.length === 0) return
    var randomIdx = getRandomIntInclusive(0, emptyLocations.length - 1);//5
    gMineLocations.push(emptyLocations[randomIdx]);
    console.log(gMineLocations);
    //model
    board[emptyLocations[randomIdx].i][emptyLocations[randomIdx].j].isMine = true;
    return gMineLocations;

}
function hins(elBtn) {
    if (!gGame.isOn) return;
    gCounterHins++;
    console.log('hits count:', gCounterHins);
    i = gRow;
    j = gCol;
    if (gCounterHins > 3) return;
    if (!gBoard[i][j].isShow) return
    if (gBoard[i][j].minesAroundCount !== 0 || gBoard[i][j].isMine) {
        expandShown2(i, j);
        elBtn.innerText = '❓'
        gHins = setTimeout(expandHide, 2000, i, j)

    }
}

function cellClicked(elCell, i, j, ev) {
    if (gGame.isOn === false) return;
    if (isUserMine) {
        gCountMine++;
        gMineLeft--;
        console.log('mines:', gMineLeft);
        var elMines = document.querySelector('h3 span')
        elMines.innerText = gMineLeft;

        console.log('count-mine1', gCountMine);
        if (gCountMine <= gLevel.mines) {
            pleaceMine(gBoard, i, j, elCell)
            //gUserMines.push({ i, j });
            return;
        }
        else {
            gMineLeft = 0;
            isUserMine = false;
            renderBoardUserMine(gBoard);

        }
    }
    console.log('cell:', elCell);
    gRow = i;
    gCol = j;
    if (gBoard[i][j].isShow === false) {
        gGame.showCount++;
        gArrUndos.push({ i: gRow, j: gCol })
    }
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
    if (checkGameOver() === true) {
        showInBoard(i, j, gBoard[i][j].minesAroundCount)
        gElBtnSmile.innerText = SMILE_WIN;
        clearInterval(gTimer);
        checkBestScoor();
        gGame.isOn = false;
        return;
    }
    if (gGame.isOn === false || gBoard[i][j].isShow === true && !gBoard[i][j].isMarked) return;
    if (ev.button === 0) leftClick(elCell, i, j)
    else if (ev.button === 2) cellMarked(elCell, i, j);
    // }
}
function cellMarked(elCell, i, j) {
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
    if (gBoard[i][j].isMarked === true && gBoard[i][j].isShow === true) {
        gBoard[i][j].isMarked = false;
        gBoard[i][j].isShow = false;
        gGame.showCount--;
        gGame.markedCount--;
        console.log(gBoard);
        showInBoard(i, j, ' ')

    } else {
        gBoard[i][j].isMarked = true;
        gBoard[i][j].isShow = true;
        gGame.markedCount++;
        // gGame.isShow++;
        console.log('gGame.show', gGame.showCount);
        showInBoard(i, j, FLAG)
    }

}
function leftClick(elCell, i, j) {

    if (gGame.showCount === 1) {
        while (gBoard[i][j].isMine) {
            initGame()
        }
        showInBoard(i, j, gBoard[i][j].minesAroundCount)
        gBoard[i][j].isShow = true;
        gTimer = setInterval(function () {
            gGame.secsPassed++;
            elSpeed = document.querySelector('h2 span');
            elSpeed.innerText = gGame.secsPassed;
        }, 1000);

    }
    gBoard[i][j].isShow = true;
    console.log('gGame.show', gGame.showCount);
    if (gBoard[i][j].isMarked === true) return
    if (gBoard[i][j].isMine === true) {
        countShowMines++;
        gCountLive++;
        gMineLeft--;
        console.log('mines:', gMineLeft);
        var elMines = document.querySelector('h3 span')
        elMines.innerText = gMineLeft;
        console.log('gGame.show', gGame.showCount);
        checkLive();
        elCell.classList.add('mine')
        showInBoard(i, j, MINE)
        gPopSound.play();
    }
    else {
        if (gBoard[i][j].minesAroundCount === 0) expandShown(i, j);
        else {
            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            elCell.classList.add('marked');
            showInBoard(i, j, gBoard[i][j].minesAroundCount)
        }
    }
}
function showAllMine() {
    for (var i = 0; i < gMineLocations.length; i++) {
        var row = gMineLocations[i].i;
        var col = gMineLocations[i].j;
        if (gMineLocations.i === row && gMineLocations.j === col) continue;
        var elCell = document.querySelector(`[data-i="${row}"][data-j="${col}"]`)
        elCell.classList.add('mine')
        showInBoard(row, col, MINE);
        var elMines = document.querySelector('h3 span')
        elMines.innerText = 0;
    }
}
function undo(elBtn) {
    if (gArrUndos.length === 0) {
        restersGame();
        return;
    }
    var i = gArrUndos.length - 1;
    gBoard[gArrUndos[i].i][gArrUndos[i].j].isShow = false;
    var row = gArrUndos[i].i;
    var col = gArrUndos[i].j;
    var elCell = document.querySelector(`[data-i="${row}"][data-j="${col}"]`)
    if (gBoard[gArrUndos[i].i][gArrUndos[i].j].isMine === true) {
        elCell.classList.remove('mine')
        gMineLeft++;
        gGame.showCount--;
        var elMines = document.querySelector('h3 span');
        elMines.innerText = gMineLeft;
    }
    elCell.classList.remove('marked');
    showInBoard(gArrUndos[i].i, gArrUndos[i].j, ' ');
    gGame.showCount--;
    gArrUndos.pop();


}
function expandShown(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            if (i === cellI && j === cellJ) {
                elCell.classList.add('marked');
                showInBoard(i, j, ' ')
                continue;
            }
            if (gBoard[i][j].isMarked === true) continue;
            if (gBoard[i][j].isShow) continue;
            // update the model:
            gBoard[i][j].isShow = true;
            gGame.showCount++;
            gArrUndos.push({ i, j })
            // update the dom:
            // var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            if (gBoard[i][j].minesAroundCount === 0) {
                elCell.classList.add('marked');
                showInBoard(i, j, ' ')
                //  var elCell=document.querySelector()
            }
            else {
                elCell.classList.add('marked');
                showInBoard(i, j, gBoard[i][j].minesAroundCount)
            }
        }
    }
}
function expandShown2(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMarked === true) continue;
            if (gBoard[i][j].isShow) continue;
            showInBoard(i, j, gBoard[i][j].minesAroundCount)
        }
    }
}
function expandHide(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMarked === true || gBoard[i][j].isShow === true) continue;
            if (i === cellI && j === cellJ) continue;
            showInBoard(i, j, ' ')

        }
    }
}
function gameOver() {
    console.log('best scoor:', gGame.secsPassed);
    gElBtnSmile.innerText = SMILE_LOSE;
    gGame.isOn = false;
    clearTimeout(gTimer);
}
function mediumLevel() {
    gLevel.size = 8;
    gLevel.mines = 12;
    gMineLeft = gLevel.mines;
    initGame();
}
function beginLevel() {
    gLevel.size = 4;
    gLevel.mines = 3;
    gMineLeft = gLevel.mines;
    initGame();
}
function expertLevel() {
    gLevel.size = 12;
    gLevel.mines = 30;
    gMineLeft = gLevel.mines;
    initGame();
}
function restersGame() {
    var elH3Live = document.querySelector('.live')
    elH3Live.innerText = '❤️ ❤️ ❤️'
    for (var i = 1; i < 4; i++) {
        var elHins = document.querySelector('.hins' + i)
        elHins.innerText = '❔'
        console.log('i');
    }
    var elSafe = document.querySelector('.safe-click');
    elSafe.style.backgroundColor = 'lightblue';
    gArrUndos = [];
    gCountSafe = 0;
    gCountLive = 0;
    gCounterHins = 0;
    gGame.showCount = 0;
    gLevel.size = 4;
    gLevel.mines = 3;
    gLevel.numberLevel = 0;
    countShowMines = 0;
    initGame();


}
//console.log(checkGameOver());
function checkGameOver() {
    if (gGame.showCount !== gLevel.size ** 2) return false;
    if (gCountLive < 3) return true;
    if (gMineLeft < countShowMines) return true
    for (var i = 0; i < gMineLocations.length; i++) {
        var mine = gMineLocations[i];
        if (!gBoard[mine.i][mine.j].isMarked === true) return false;
    }
    return true;
}
function emptyCell() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].isShow) {
                emptyCells.push({ i: i, j: j });
            }
        }

    }
    console.log('empty cells', emptyCells);
    return emptyCells

}
function safeClick(elBtn) {
    if (gGame.isOn === false) return;
    var emptyCells = emptyCell();
    gCountSafe++;
    if (gCountSafe <= 3) {
        var randomIdx = getRandomIntInclusive(0, emptyCells.length - 1)
        console.log('idx', randomIdx);
        var i = emptyCells[randomIdx].i;
        var j = emptyCells[randomIdx].j
        console.log('i:', i);
        console.log('j:', j);
        var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
        elCell.classList.add('marked');
        showInBoard(emptyCells[randomIdx].i, emptyCells[randomIdx].j, ' ')
        setTimeout(function () {
            elCell.classList.remove('marked');
        }, 2000);
    }
    else elBtn.style.backgroundColor = 'grey';
}
function checkLive() {
    var elH3Live = document.querySelector('.live')
    switch (gCountLive) {
        case 1:
            elH3Live.innerText = '❤️❤️💔'
            break;
        case 2:
            elH3Live.innerText = '❤️💔💔'
            break;
        case 3:
            elH3Live.innerText = '💔💔💔'
            showAllMine();
            gameOver();
            break;

        default:
            return null;
    }

}
function clearBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j] = {
                isMine: false,
                isShow: false,
                isMarked: false,
                minesAroundCount: 0
            };
            showInBoard(i, j, ' ')
        }
    }
    return gBoard;
}
function putMine() {
    if (gGame.showCount !== 0) return;
    gMineLeft = gLevel.mines;
    isUserMine = true;
    clearBoard();
    gUserMines = [];
    gCountMine = 0;
    gMineLocations = [];
    //msg


}
function checkBestScoor() {
    // Check browser support
    if (typeof (Storage) !== "undefined") {
        // Store
        if (gGame.secsPassed < localStorage.getItem("best-scoor")) {
            gBestScoor = gGame.secsPassed;
            localStorage.setItem("best-scoor", gBestScoor);
        }

    }
    document.querySelector(".result").innerHTML = localStorage.getItem("best-scoor");
}