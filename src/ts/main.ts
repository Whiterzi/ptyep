import qtls from './qstlist.js';

const displayUnit = document.querySelector<HTMLDivElement>('.main-container > .main-img');
const contentUnit = document.querySelector<HTMLDivElement>('.main-container > .main-content');

const questList: { [key: string]: { path: string } } = qtls;

document.querySelector('.button-action-row > .next-btn')
  ?.addEventListener('click', toNext);

document.querySelector('.button-action-row > .prev-btn')
?.addEventListener('click', toPrev);

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

function setBackgroundImage(imageUrl: string) {
  if (displayUnit) {
      displayUnit.style.backgroundImage = `url(/ptyep${imageUrl})`;
  }
}

function setContentText(text: string) {
  if (contentUnit) {
      contentUnit.textContent = text;
  }
}

function getIndexImage(index: number) {
  const keys = Object.keys(questList);
  return { name: keys[index], path: questList[keys[index]].path };
}

function init() {
  const randomImage = getIndexImage(currentIndex);
  setBackgroundImage(randomImage.path);
  setContentText(randomImage.name);
}

init();