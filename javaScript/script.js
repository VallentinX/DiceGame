'use strict';

//Select elements - Floating varables
const scoreElm_1stPlayer = document.querySelector('p#score--0');
const scoreElm_2ndPlayer = document.querySelector('p#score--1');

const diceElm = document.querySelector('img.dice');

const bttNew = document.querySelector('button.btn--new');
const bttRoll = document.querySelector('button.btn--roll');
const bttHold = document.querySelector('button.btn--hold');

const playerOneActive = document.querySelector('section.player--0');
const playerTwoActive = document.querySelector('section.player--1');

const scoreElmOne = document.querySelector('p#current--0');
const scoreElmTwo = document.querySelector('p#current--1');
// Start restart the game
let activePLayer, scores, gameOn, currentScore;

const start = function () {
  activePLayer = 0;
  scores = [0, 0];
  gameOn = true;
  currentScore = 0;

  scoreElmOne.textContent = 0;
  scoreElmTwo.textContent = 0;
  scoreElm_1stPlayer.textContent = 0;
  scoreElm_2ndPlayer.textContent = 0;

  playerOneActive.classList.remove('player--winner');
  playerTwoActive.classList.remove('player--winner');
  playerOneActive.classList.add('player--active');
  playerTwoActive.classList.remove('player--active');

  diceElm.classList.add('hidden');
};

start();
// Refactor functions
const switchPlayer = function () {
  document.querySelector(`p#current--${activePLayer}`).textContent = 0;

  activePLayer = activePLayer === 0 ? 1 : 0;

  currentScore = 0;

  playerOneActive.classList.toggle('player--active');
  playerTwoActive.classList.toggle('player--active');
};
// Functions handler
const rollDice = function () {
  if (gameOn) {
    const dice = Math.floor(Math.random() * 6) + 1;

    diceElm.classList.remove('hidden');
    diceElm.src = `./images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;

      document.querySelector(`p#current--${activePLayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};
const holdPoints = function () {
  if (gameOn) {
    scores[activePLayer] += currentScore;

    document.querySelector(`p#score--${activePLayer}`).textContent =
      scores[activePLayer];

    if (scores[activePLayer] >= 100) {
      gameOn = false;

      document
        .querySelector(`section.player--${activePLayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`section.player--${activePLayer}`)
        .classList.remove('player--active');

      diceElm.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
};

const playAgain = function () {
  start();
};
// Event Listener
bttRoll.addEventListener('click', rollDice);
bttHold.addEventListener('click', holdPoints);
bttNew.addEventListener('click', playAgain);
