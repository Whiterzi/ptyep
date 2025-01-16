var _a, _b;
import { genQuestionGroup } from './questions.js';
const contentUnit = document.querySelector('.main-container > .main-content');
const counterUnit = document.querySelector('.main-container > .level-counter');
const scoreUnit = document.querySelector('.main-container > .score-counter');
const answerStatUnit = document.querySelector('.main-container > .answer-status');
const homeViewUnit = document.querySelector('.home-view');
const gameViewUnit = document.querySelector('.game-view');
(_a = document.querySelector('.button-action-row > .next-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', toNext);
(_b = document.querySelector('.button-action-row > .prev-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', toPrev);
$('.button-action-row > .pass-btn').on('click', (_) => {
    if (isEnd)
        return;
    passedWords.add(currentQuestionIndex);
    toNext();
});
$('.button-action-row > .correct-btn').on('click', (e) => {
    if (isEnd)
        return;
    if (!answeredWords.has(currentQuestionIndex))
        currentScore += parseInt(contentUnit.dataset.point);
    answeredWords.add(currentQuestionIndex);
    toNext();
});
$('.back-btn').on('click', (_) => {
    endGame();
    backToHome();
});
const passedWords = new Set();
const answeredWords = new Set();
let isEnd = false;
const totalScore = Array(3).fill(0);
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
function setContentText(text, isHard) {
    if (!contentUnit)
        return;
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
        }
        else {
            answerStatUnit.classList.remove('correct', 'passed');
            answerStatUnit.textContent = '';
        }
    }
}
function tryRenderScore() {
    const groupList = $('.home-view .group-list');
    if (!groupList)
        return;
    for (let i = 0; i < groupList.children().length; i++) {
        const item = groupList.children().eq(i);
        const score = totalScore[i];
        item.find('.score').text(`${score} 分`);
        if (playedTeams.has(i))
            item.addClass('played');
    }
}
let questions = genQuestionGroup(3);
let currentGroupIndex = 0;
let currentQuestionIndex = 0;
let currentScore = 0;
function initGame() {
    homeViewUnit === null || homeViewUnit === void 0 ? void 0 : homeViewUnit.classList.add('hide');
    gameViewUnit === null || gameViewUnit === void 0 ? void 0 : gameViewUnit.classList.remove('hide');
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
const playedTeams = new Set();
function backToHome() {
    gameViewUnit === null || gameViewUnit === void 0 ? void 0 : gameViewUnit.classList.add('hide');
    homeViewUnit === null || homeViewUnit === void 0 ? void 0 : homeViewUnit.classList.remove('hide');
    tryRenderScore();
}
function init() {
    questions = genQuestionGroup(3);
    $(homeViewUnit).on('click', '.group-list > li', (e) => {
        const target = e.currentTarget;
        if (target.classList.contains('played'))
            return;
        const index = $('.group-list').children().index(target);
        currentGroupIndex = index;
        initGame();
    });
}
init();
