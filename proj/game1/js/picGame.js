'use strict'
var gQuests;
var gCurrQuestIdx = 0
var gNextId = 0;


function initGame() {
    gQuests = createQuests();
    renderQuest();

}
function createQuests() {
    var quests = [
        { id: gNextId++, opts: ['cat', 'dog', 'frog'], correctIndex: 1 },
        { id: gNextId++, opts: ['cucumber', 'tomato', 'Carrot'], correctIndex: 2 },
        { id: gNextId++, opts: ['16', '14', '15'], correctIndex: 1 }
    ];
    return quests;
}
function renderQuest() {
    if(gCurrQuestIdx<3){
    var strHtml = '';
    var elPic = document.querySelector('.pleaceToPic img');
    elPic.src = `pic/${gCurrQuestIdx + 1}.jpg`
    
    for (var i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {
    
        strHtml += `<button onclick="checkAnswer(this)" 
        class="button button${i + 1}">${gQuests[gCurrQuestIdx].opts[i]}</button>`;
        // onmouseover="getSpeed(${i})"
        // onclick = "blowingUp(this)"

    }
    console.log(strHtml);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
    }
    else{
        console.log('very good you win in the game!');
        gCurrQuestIdx=0;
        initGame();
    }

}
function changeColor(elOpt){
    elOpt.style.backgroundColor='grey';
}
function checkAnswer(elOpt) {
    var correctIndex = gQuests[gCurrQuestIdx].correctIndex;
    if (elOpt.innerText === gQuests[gCurrQuestIdx].opts[correctIndex]) {
       elOpt.innerText= 'Victorious';
       elOpt.style.backgroundColor='green';
        gCurrQuestIdx++
         setTimeout(renderQuest,2000)
    }
    else{
        elOpt.style.backgroundColor='red';
        setTimeout(changeColor,2000,elOpt)
    }
 //   elOpt.innerText= 'Try again';


}