const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");
const winnerDisplay = document.getElementById("winner-display");
const rollButton = document.getElementById("roll-button");
let tagsArray = [];

textarea.focus();

textarea.addEventListener("keyup", (e) => {
  createTags(e.target.value);
});

rollButton.addEventListener("click", () => {
  randomSelect();
});

function createTags(input) {
  tagsArray = input
    .split("\n")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  tagsEl.innerHTML = '';

  tagsArray.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

function randomSelect() {
  const times = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();

      highlightTag(randomTag);
      displayWinner(randomTag); 
      removeWinner(randomTag); 
    }, 100);

  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add('highlight');
}

function unHighlightTag(tag) {
  tag.classList.remove('highlight');
}

function displayWinner(winnerTag) {
  const winnerText = winnerTag.innerText;
  winnerDisplay.innerText = `Winner: ${winnerText}`;
}

function removeWinner(winnerTag) {
  const winnerText = winnerTag.innerText;
  tagsArray = tagsArray.filter(tag => tag !== winnerText);
  textarea.value = tagsArray.join("\n");

  createTags(textarea.value);
}
