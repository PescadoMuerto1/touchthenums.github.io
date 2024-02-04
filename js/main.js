'use strict'

var gBoardNums 
var gCorrectNum = 1
var gTimesClicked = 0
var gStopWatch
var gMilliseconds = 0
var gSeconds = 0
var gBoardSize = 16
var gTime 

// onInit()
function onInit(){
 
    renderStartEnd(true)
}

function play(){
    gBoardNums = getNumbers(gBoardSize)
    renderBoard(gBoardNums)
    startStopWatch()
}

function renderBoard(boardNums) {
    shuffle(boardNums)
    var strHTML = ''
    const length = Math.sqrt(boardNums.length)
    var count = 0
    for (var i = 0; i < length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < length; j++) {
            strHTML += `<td onclick="onCellClicked(this,${boardNums[count]})">${boardNums[count]}</td>`
            count++
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}

function renderStartEnd(isStart){
    const elBoard = document.querySelector('tbody.board')
    if(isStart){
        elBoard.innerHTML = `<button class="play" onclick="play()">Play</button>`
    }else{
        elBoard.innerHTML = `<h1>good job!!!</h1><h2> you did it in only: <span>${gTime}</span> seconds</h2>
        <button class="play-again" onclick="play()">Play again</button>`
    }
}

function onCellClicked(elCell ,cellNum){
    if (cellNum === gCorrectNum){
        elCell.style.opacity = '100%'
        gCorrectNum++
        gTimesClicked++
        console.log('times ' + gTimesClicked + ' num ' + gCorrectNum);
        if(gTimesClicked === gBoardNums.length){
            renderStartEnd(false)
            stopStopWatch() 
            gStopWatch = false
            gCorrectNum = 1
            gTimesClicked = 0
        }
        document.querySelector('.next-number').innerText = gCorrectNum
    }
}

function getNumbers(length){
    var boardNums = []

    for (var i = 0; i < length; i++) {
        boardNums[i] = i+1
        
    }
    return boardNums
}

function startStopWatch(){
   gStopWatch = setInterval(stopWatch,1)
   
}

function stopStopWatch(){
    clearInterval(gStopWatch)
    gMilliseconds=0
    gSeconds=0
}



function stopWatch(){

    if(gMilliseconds < 996){

        gMilliseconds += 4
        
    }else{
        gSeconds++
        gMilliseconds = 0
    }
    gTime = gSeconds.toString().padStart(2, '0') + '.' + gMilliseconds.toString().padStart(3, '0')
    
    document.querySelector('.stopwatch').innerText = gTime
}

function onGameLevel(elBtn, num){
    if(!gStopWatch){
        gBoardSize = num
        const elBtns = document.querySelectorAll('.level-btn')
        elBtns[0].style.opacity = '70%'
        elBtns[1].style.opacity = '70%'
        elBtns[2].style.opacity = '70%'
        elBtn.style.opacity = '100%'
    }
}

function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
        var randIdx = getRandomInt(0, i + 1);
        var keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}



function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

