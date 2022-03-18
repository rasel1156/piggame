'use strict';
// btns
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//others
const players = document.querySelectorAll('.player');
const winmessage = document.querySelector('.win-message');
// dice select
const dice = document.querySelector('.dice');


// some initia; value
let currentValue, currentItem, isPlaying;
function initValue(){
    currentValue =  0;
    currentItem = 0;
    isPlaying = true;
    dice.classList.add('hidden');
}
initValue();
// active player change
function activePlayer(){
        players[0].classList.toggle('player--active');
        players[1].classList.toggle('player--active');
}

btnRoll.addEventListener('click', function(){
    if(isPlaying){
        dice.classList.remove('hidden');
        let diceNumber = Math.trunc(Math.random() * 6) + 1;
         dice.src = `images/dice-${diceNumber}.png`;
        if(diceNumber != 1){
            currentValue += diceNumber;
            document.getElementById(`current--${currentItem}`).textContent = currentValue;
        } else{
            document.getElementById(`current--${currentItem}`).textContent = 0;
            currentValue =  0;
            currentItem = currentItem == 0 ? 1 : 0;
            activePlayer();
        }
    }
});

btnHold.addEventListener('click', function(){
    if(isPlaying){
        let totallCurrent = parseInt(document.getElementById(`current--${currentItem}`).textContent);
        if(totallCurrent != 0){
            let scrore = parseInt(document.getElementById(`score--${currentItem}`).textContent);
            let scroreNumber = scrore + totallCurrent;
            document.getElementById(`score--${currentItem}`).textContent = scroreNumber;
            document.getElementById(`current--${currentItem}`).textContent = 0;
            currentValue = 0;

            if(scroreNumber >= 100 ){
                winmessage.textContent = `Player ${currentItem + 1} is win 🎆`;
                document.querySelector('.win-game').classList.remove('hidden');
                dice.classList.add('hidden');
                isPlaying = false;

            } else{
                activePlayer();
                    currentItem = currentItem == 0 ? 1 : 0;
            }
        }
    }
});


btnNew.addEventListener('click', function(){

    initValue();
    
    let allScore = document.querySelectorAll('.score');
    let allCurrent = document.querySelectorAll('.current-score');
    document.getElementById(`current--${currentItem}`).textContent = 0;

 
    for(let x = 0; x < allScore.length; x++){
        allScore[x].textContent = 0;
    }
    for(let y = 0;  y < allCurrent.length; y++){
        allCurrent[y].textContent = 0;
    };
    
    if(players[1].classList.contains('player--active')){
        players[0].classList.add('player--active');
        players[1].classList.remove('player--active');   
    }
    document.querySelector('.win-game').classList.add('hidden');
});


