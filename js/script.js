'use strict';
//variables definitions
var params = {
    playerName: '',
    playerMove: '',
    pcMove: '',
    pcSet: '',
    rounds: '',
    playerChoice: '',
    progress: []
}
var output = document.getElementById('output');
var gameResult = document.getElementById('gameResult');
var playerResult = document.getElementById('playerResult').innerHTML = 0;
var pcResult = document.getElementById('pcResult').innerHTML = 0;
var selectMove = document.getElementsByClassName('player-move');
var modal = document.querySelector('#modal-overlay');   
var startModal = document.querySelector('#modal-overlay2');    
var modals = document.querySelectorAll('.modal');

// BUTTONS VARIABLES

var newGame = document.getElementById('newGame');
var startGame = document.getElementById('start-game');  
var closeButtons = document.querySelectorAll('.modal .close');

// MAIN GAME FUNCTIONS

function pcChoice() {
    return Math.floor(Math.random() * 3 + 1);
}

function empty() {
    params.progress.length = 0;
}

function compare() {
           
    if (playerResult == (params.rounds - 1)) {
        modal.classList.add('show');           
        document.getElementById('gameResult').innerHTML = "<span style=\"color:green\">" + 'CONGRATULATIONS!' + '<br>' + 'YOU WON THE ENTIRE GAME' + '<br>' + 'Game over, please press the New Game button' + "</span>";
        document.getElementById('playerResult').innerHTML = params.rounds;
        return;
    } else if (pcResult == (params.rounds - 1)) {
        modal.classList.add('show');                 
        document.getElementById('gameResult').innerHTML = "<span style=\"color:red\">" + 'YOU LOST THE ENTIRE GAME' + '<br>' + 'Game over, please press the New Game button' + "</span>";
        document.getElementById('pcResult').innerHTML = params.rounds;
        return;
    } else {

        if (params.pcMove == params.playerMove) {
            output.innerHTML = params.playerName + ' TIED!';
            params.progress.push({content: 'YOU TIED!'});
            progressCount();
        } else if ((params.playerMove == 1 && params.pcMove == 2) || (params.playerMove == 2 && params.pcMove == 3) || (params.playerMove == 3 && params.pcMove == 1)) {
            output.innerHTML = params.playerName + ' LOST with: ' + params.playerChoice;
            document.getElementById('pcResult').innerHTML = 1 + pcResult++;
            params.progress.push({content: 'YOU LOST with: ' + params.playerChoice + ' PC chose ' + params.pcSet + ', Score: ' + playerResult + ' | ' + pcResult});
            progressCount();
        } else {
            output.innerHTML = params.playerName + ' WON with: ' + params.playerChoice;
            document.getElementById('playerResult').innerHTML = 1 + playerResult++;
            params.progress.push({content: 'YOU WON with: ' + params.playerChoice + ' PC chose ' + params.pcSet + ', Score: ' + playerResult + ' | ' + pcResult});
            progressCount();
        }
    }
}

function progressCount() {
    var scoreTable = document.createElement('p');       
    for (var c in params.progress) {
        scoreTable.innerHTML = params.progress.length + '. ' + params.progress[c].content;
        document.getElementById('modal').appendChild(scoreTable);
    } 
}


// BUTTONS CLICK

for (var p = 0; p < selectMove.length; p++) {
    selectMove[p].addEventListener('click', function () {
        var choice = this.getAttribute('id');
        params.playerMove = choice;
        if (params.playerMove == 1) {
            params.playerChoice = 'paper';
        } else if (params.playerMove == 2) {
            params.playerChoice = 'scissors';
        } else {
            params.playerChoice = 'rock';
        }
        params.pcMove = pcChoice();
        if (params.pcMove == 1) {
            params.pcSet = 'paper';
        } else if (params.pcMove == 2) {
            params.pcSet = 'scissors';
        } else if (params.pcMove == 3){
            params.pcSet = 'rock';
        }
        compare();
    });
    
}

// NEWGAME

newGame.addEventListener('click', function () {
    startModal.classList.add('show');    
});

startGame.addEventListener('click', function() {
    params.playerName = document.getElementById('player-name').value; 
    params.rounds = document.getElementById('rounds-number').value;
    playerResult = document.getElementById('playerResult').innerHTML = 0;
    pcResult = document.getElementById('pcResult').innerHTML = 0;
    gameResult.innerHTML = '';
    output.innerHTML = '';
    if (isNaN(params.rounds)) {
        output.innerHTML = 'Please pick a number!';
    } 
    
    document.querySelector('#modal-overlay2').classList.remove('show');
});

// MODALS

var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
    document.querySelector('#modal-overlay2').classList.remove('show');
};
document.querySelector('#modal-overlay').addEventListener('click', hideModal);
document.querySelector('#modal-overlay2').addEventListener('click', hideModal);
for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
}

for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
        event.stopPropagation();
    });
}


