import {genQuestionGroup} from './questions.js';

const contentUnit = document.querySelector<HTMLDivElement>('.main-container > .main-content');
const counterUnit = document.querySelector<HTMLDivElement>('.main-container > .level-counter');
const scoreUnit = document.querySelector<HTMLDivElement>('.main-container > .score-counter');
const answerStatUnit = document.querySelector<HTMLDivElement>('.main-container > .answer-status');

const homeViewUnit = document.querySelector<HTMLDivElement>('.home-view');
const gameViewUnit = document.querySelector<HTMLDivElement>('.game-view');

document.querySelector('.button-action-row > .next-btn')
  ?.addEventListener('click', toNext);

document.querySelector('.button-action-row > .prev-btn')
?.addEventListener('click', toPrev);

$('.button-action-row > .pass-btn').on('click', (_) => {
  if (isEnd) return;
  passedWords.add(currentQuestionIndex);

  toNext();
});
$('.button-action-row > .correct-btn').on('click', (e) => {
  if (isEnd) return;
  if (!answeredWords.has(currentQuestionIndex))
    currentScore += parseInt(contentUnit!.dataset.point!);

  answeredWords.add(currentQuestionIndex);
  toNext();
});

$('.back-btn').on('click', (_) => {
  endGame();
  backToHome();
});

const passedWords: Set<number> = new Set();
const answeredWords: Set<number> = new Set();

let isEnd:boolean = false;

const totalScore: number[] = Array(3).fill(0);

function toNext() {
  if (currentQuestionIndex < questions[currentGroupIndex].length - 1)
    currentQuestionIndex++;
  else
   endGame();
  rerender();
}

function toPrev() {
  if (currentQuestionIndex > 0)
    currentQuestionIndex--;
  rerender();
}

function setContentText(text: string, isHard: boolean) {
  if (!contentUnit) return;
  
  contentUnit.textContent = text;
  contentUnit.classList.toggle('hard', isHard);
  contentUnit.dataset.point = isHard ? '2' : '1';
}

function rerender() {
  const currentQuestion = questions[currentGroupIndex][currentQuestionIndex];

  setContentText(currentQuestion, (currentQuestionIndex + 1) % 3 == 0);

  if (counterUnit)
    counterUnit.textContent = `${currentQuestionIndex + 1} / ${questions[currentGroupIndex].length}`;

  if (scoreUnit)
    scoreUnit.textContent = `${currentScore} pts`;

  if (answerStatUnit) {
    if (isEnd) {
      answerStatUnit.textContent = answeredWords.has(currentQuestionIndex) ? '✓' : '✗';
      answerStatUnit.classList.toggle('correct', answeredWords.has(currentQuestionIndex));
      answerStatUnit.classList.toggle('passed', passedWords.has(currentQuestionIndex));
    } else {
      answerStatUnit.classList.remove('correct', 'passed');
      answerStatUnit.textContent = '';
    }
  }
}

function tryRenderScore() {
  const groupList = $('.home-view .group-list');
  if (!groupList) return;

  for (let i = 0; i < groupList.children().length; i++) {
    const item = groupList.children().eq(i);
    const score = totalScore[i];
    item.find('.score').text(`${score} 分`);

    if (playedTeams.has(i))
      item.addClass('played');
  }
}

let questions: string[][] = genQuestionGroup(3);
let currentGroupIndex = 0;
let currentQuestionIndex = 0;
let currentScore = 0;

function initGame() {
  homeViewUnit?.classList.add('hide');
  gameViewUnit?.classList.remove('hide');

  currentQuestionIndex = 0;
  currentScore = 0;
  totalScore[currentGroupIndex] = 0;
  passedWords.clear();
  answeredWords.clear();
  $('.correct-btn').removeClass('disabled');
  $('.prev-btn').addClass('hide');
  $('.next-btn').addClass('hide');
  $('.back-btn').addClass('hide');
  isEnd = false;
  rerender();

  $('.button-action-row > .score-btn').one('click', endGame);
}

function endGame() {
  $('.prev-btn').removeClass('hide');
  $('.next-btn').removeClass('hide');
  $('.correct-btn').addClass('disabled');
  $('.pass-btn').addClass('disabled');
  $('.back-btn').removeClass('hide');
  isEnd = true;

  totalScore[currentGroupIndex] = currentScore;

  playedTeams.add(currentGroupIndex);
}

const playedTeams = new Set<number>();

function backToHome() {
  gameViewUnit?.classList.add('hide');
  homeViewUnit?.classList.remove('hide');

  tryRenderScore();
}

function init() {
  questions = genQuestionGroup(3);

  $(homeViewUnit!).on('click', '.group-list > li', (e) => {
    const target = e.currentTarget as HTMLLIElement;
    if (target.classList.contains('played')) return;

    const index = $('.group-list').children().index(target);
    currentGroupIndex = index;

    initGame();
  });
}

init();