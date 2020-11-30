const GAME_FREQ = 1000;
var gSizeBoard = 4;
var gGameInterval;
var gCurrNum;
var gNums;
var gBoard;
var gSeconds ;
var gMinutes ;

function restaetGame() {
    gSeconds = 0;
    gMinutes = 0;
    var elTime = document.querySelector('.timer')
    elTime.style.display = 'none';
    var elNextNum = document.querySelector('.num')
    elNextNum.style.display = 'none';
    gCurrNum = 1;
    gNums = resetNums();
    renderBoard()
}
function play() {
    setTimeout(restaetGame(), GAME_FREQ);
}
function eazy() {
    gSizeBoard = 4;
    restaetGame()
}
function hard() {
    gSizeBoard = 5;
    restaetGame()
}
function expert() {
    gSizeBoard = 6;
    restaetGame()
}
function resetNums() {
    var numsRandoms = [];
    for (var i = 0; i < gSizeBoard ** 2; i++) {
        numsRandoms.push(i + 1);
    }
    return numsRandoms;
}
function drawNum() {
    var idx = getRandomInt(0, gNums.length - 1)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num

}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
function getTime() {
    gSeconds++;
    if (gSeconds >= 60) {
        gSeconds = 0;
        gMinutes++;
        if (gMinutes >= 60) {
            gMinutes = 0;
            gSeconds = 0;
        }
    }
    var elTime = document.querySelector('.timer h4')

    elTime.innerText = 'Gime Time:' + (gMinutes ? (gMinutes > 9 ? gMinutes : "0" + gMinutes) : "00") + ":" + (gSeconds > 9 ? gSeconds : "0" + gSeconds);

    timer();
}
function timer() {
    t = setTimeout(getTime, 1000);
}

function cellClicked(elBtn) {
    var elNextNumH4 = document.querySelector('.num h4')
    console.log(elBtn.innerText);
    if (elBtn.innerText==='1'&&gCurrNum === 1) {
        var elTime = document.querySelector('.timer')
        elTime.style.display = 'inline-block';
        timer()
        var elNextNum = document.querySelector('.num')
        elNextNum.style.display = 'inline-block';



    }
    if (gCurrNum < gSizeBoard ** 2) {
        console.log(elBtn.innerText);
        var num = gCurrNum + '';
        console.log('num:', num);
        if (elBtn.innerText === num) {
            elBtn.classList.add('click-cell')
            gCurrNum++;
            elNextNumH4.innerText = 'Next number is:' + gCurrNum
        }


    }
    else {
        // elTime.classList.remove('.times');
        // console.log('game over');
        elNextNumH4.innerText = 'game over!'
        clearTimeout(t);
        // initGame();
    }




}

function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < gSizeBoard; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gSizeBoard; j++) {
            // var className = (board[i][j]) ? 'occupied' : '';
            strHtml += `<td onclick="cellClicked(this,${i},${j})">${drawNum()}</td>`
        }
        strHtml += '</tr>'
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml
}
