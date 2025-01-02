const displayUnit = document.querySelector('.main-container > .main-img');
const contentUnit = document.querySelector('.main-container > .main-content');
import qtls from '../qst/qstlist.json';
const questList = qtls;
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
function getRandomImage() {
    // const keys = Object.keys(questList);
    // const randomKey = keys[Math.floor(Math.random() * keys.length)];
    // return { name: randomKey, path: questList[randomKey].path };
}
function init() {
    const randomImage = getRandomImage();
    // setBackgroundImage(randomImage.path);
    // setContentText(randomImage.name);
}
init();
