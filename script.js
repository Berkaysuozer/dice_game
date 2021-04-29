'use strict';

const score0DOM = document.querySelector('#score--0');
const score1DOM = document.querySelector('#score--1');
const diceDOM = document.querySelector('.dice');
const current0DOM = document.querySelector('#current--0');
const current1DOM = document.querySelector('#current--1');

const newButtonDOM = document.querySelector('.btn--new');
const rollButtonDOM = document.querySelector('.btn--roll');
const holdButtonDOM = document.querySelector('.btn--hold');
const player0DOM = document.querySelector('.player--0');
const player1DOM = document.querySelector('.player--1');

let scores = [0, 0];
score0DOM.textContent = scores[0];
score1DOM.textContent = scores[1];
diceDOM.classList.add('hidden');
let activePlayer = 0;
let currentScr = 0;
let playing = true;
//zar sallama
const rollDice = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceDOM.classList.remove('hidden');
    diceDOM.src = `dice-${dice}.png`;

    if (dice === 1) {
      currentScr = 0;
      document.getElementById(
        `current--${activePlayer}`
      ).innerHTML = currentScr;
      activePlayer = activePlayer === 0 ? 1 : 0;
      //BURDAKİ 2 SATIR KOD VE AŞAĞIDAKİ KOD AYNI İŞE YARIYOR :D TOGGLE KULLAN
      player0DOM.classList.toggle('player--active');
      player1DOM.classList.toggle('player--active');

      /* //CHANGE COLOR START
    // 1. REMOVO THE ACTİVE CLASS FROM PLAYER0
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    //CHANGE THE ACTİVE PLAYER
    activePlayer = activePlayer === 0 ? 1 : 0;
    //ADD ACTİVE-CLASS TO THE PLAYER1
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
    //CHANGE COLOR END */
    } else {
      currentScr += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).innerHTML = currentScr;
    }
  }
};

const Hold = () => {
  if (playing) {
    scores[activePlayer] += currentScr;
    document.getElementById(`score--${activePlayer}`).innerHTML =
      scores[activePlayer];
    currentScr = 0;
    document.getElementById(`current--${activePlayer}`).innerHTML = currentScr;
    if (scores[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceDOM.classList.remove('hidden');
    } else {
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0DOM.classList.toggle('player--active');
      player1DOM.classList.toggle('player--active');
    }
  }
};

const New = () => {
  playing = true;
  scores = [0, 0];
  score0DOM.textContent = scores[0];
  score1DOM.textContent = scores[1];
  currentScr = 0;
  document.querySelector('.current-score').innerHTML = currentScr;

  document.querySelector(`.player--0`).classList.remove('player--winner');

  document.querySelector(`.player--1`).classList.remove('player--winner');

  player0DOM.classList.add('player--active');
};

rollButtonDOM.addEventListener('click', rollDice);
holdButtonDOM.addEventListener('click', Hold);
newButtonDOM.addEventListener('click', New);
