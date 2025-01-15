var _a, _b;
import qtls from './qstlist.js';
const displayUnit = document.querySelector('.main-container > .main-img');
const contentUnit = document.querySelector('.main-container > .main-content');
const questList = qtls;
(_a = document.querySelector('.button-action-row > .next-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', toNext);
(_b = document.querySelector('.button-action-row > .prev-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', toPrev);
let currentIndex = 0;
function toNext() {
    const keys = Object.keys(questList);
    currentIndex = (currentIndex + 1) % keys.length;
    setBackgroundImage(questList[keys[currentIndex]].path);
    setContentText(keys[currentIndex]);
}
function toPrev() {
    const keys = Object.keys(questList);
    currentIndex = (currentIndex - 1 + keys.length) % keys.length;
    setBackgroundImage(questList[keys[currentIndex]].path);
    setContentText(keys[currentIndex]);
}
function setBackgroundImage(imageUrl) {
    if (displayUnit) {
        displayUnit.style.backgroundImage = `url(${imageUrl})`;
    }
}
function setContentText(text) {
    if (contentUnit) {
        contentUnit.textContent = text;
    }
}
function getIndexImage(index) {
    const keys = Object.keys(questList);
    return { name: keys[index], path: questList[keys[index]].path };
}
function init() {
    const randomImage = getIndexImage(currentIndex);
    setBackgroundImage(randomImage.path);
    setContentText(randomImage.name);
}
init();
