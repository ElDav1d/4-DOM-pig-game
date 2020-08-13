/*
INITIAL GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer, gamePlaying, diceScoresSix, winningScore, winningScoreInput, winningScoreDisplay, diceContainer, playerZeroPanel, playerOnePanel, currentScoreZero, currentScoreOne;

init();

winningScoreInput.addEventListener('change', function () {
    winningScore = winningScoreInput.value;
    winningScoreDisplay.textContent = winningScore;
});

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random Number
        var rollDice = function () {
            return Math.floor(Math.random() * 6) + 1;
        }

        var dice1 = rollDice();
        var dice2 = rollDice();

        // 2. Display the result
        diceContainer.classList.add('dice-container-active');
        document.getElementById('diceOne').src = 'dice-' + dice1 + '.png';
        document.getElementById('diceTwo').src = 'dice-' + dice2 + '.png';

        // Change player IF two SIX in a throw
        if (dice1 === 6 && dice2 === 6) {
            console.log('player ' + activePlayer + ' had two SIX in a throw');
            setScoreZero();
            nextPlayer();
            return;
        }

        // Increase SIX counter
        if (dice1 === 6 || dice2 === 6) {
            diceScoresSix += 1;
        }

        // Change player and set score zero IF second SIX in a row
        if (diceScoresSix === 2) {
            console.log('player ' + activePlayer + ' had two SIX in a row');
            setScoreZero();
            nextPlayer();
            return;
        }

        // Change player and set score zero IF one dice is ONE
        if (dice1 === 1 || dice2 === 1) {
            console.log('player ' + activePlayer + ' had ONE');
            setScoreZero();
            nextPlayer();
            return;
        }

        // Add score TO ROUNDSCORE
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            diceContainer.classList.remove('dice-container-active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

function setScoreZero() {
    scores[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = '0';
};

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    diceScoresSix = 0;

    currentScoreZero.textContent = '0';
    currentScoreOne.textContent = '0';

    playerZeroPanel.classList.toggle('active');
    playerOnePanel.classList.toggle('active');

    diceContainer.classList.remove('dice-container-active');
};

// remember not to use the function call () when adding listener
//or the function will be imediatelly called without the event
document.querySelector('.btn-new-game').addEventListener('click', init);

function init() {
    gamePlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    diceScoresSix = 0;
    winningScore = 100;
    winningScoreDisplay = document.getElementById('winningScoreDisplay');
    winningScoreInput = document.getElementById('winningScoreInput');
    diceContainer = document.getElementById('diceContainer');
    playerZeroPanel = document.querySelector('.player-0-panel');
    playerOnePanel = document.querySelector('.player-1-panel');
    currentScoreZero = document.getElementById('current-0');
    currentScoreOne = document.getElementById('current-1');

    diceContainer.classList.remove('dice-container-active');
    winningScoreDisplay.textContent = winningScore;
    winningScoreInput.value = winningScore;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    currentScoreZero.textContent = '0';
    currentScoreOne.textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    playerZeroPanel.classList.remove('winner');
    playerOnePanel.classList.remove('winner');
    playerZeroPanel.classList.remove('active');
    playerOnePanel.classList.remove('active');
    playerZeroPanel.classList.add('active');
};