import questions from './questions.js';

const qs = (selector) => {
  return document.querySelector(selector);
}

const qsa = (selector) => {
  return document.querySelectorAll(selector);
}

var rightIcon =
`
<svg class="icon right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path fill="none" d="M0 0h24v24H0V0z"/>
  <path fill="currentColor" d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/>
</svg>
`;

var wrongIcon =
`
<svg class="icon wrong" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path fill="none" d="M0 0h24v24H0V0z"/>
  <path fill="currentColor" d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
</svg>
`;

const questionsContainer = qs('.questions-container');
const bullets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const bgColors = [
  {
    background: '#f36e64',
    altColor: '#b6ff07',
    color: '#FFF'
  },
  {
    background: '#4CAF50',
    altColor: '#FFEB3B',
    color: '#FFF'
  },
  {
    background: '#2196F3',
    altColor: '#FFEB3B',
    color: '#FFF'
  }
];

// For Every Question
questions.forEach((questionData) => {

  var optionsBlock = '';
  for (var i = 0; i < questionData.options.length; i++) {
    if (questionData.answers.includes(i + 1)) {
      optionsBlock += `<span right>${bullets[i]}) ${questionData.options[i]}</span>`
    } else {
      optionsBlock += `<span>${bullets[i]}) ${questionData.options[i]}</span>`
    }
  }

  var cBackground = bgColors[Math.floor(Math.random() * bgColors.length)];

  var questionCard =
  `
  <div class="card" style="background-color: ${cBackground.background}">
    <p style="color: ${cBackground.altColor}">${questionData.question}</p>
    <div style="color: ${cBackground.color}" class="options">
      ${optionsBlock}
    </div>
    ${rightIcon}
    ${wrongIcon}
  </div>
  `

  questionsContainer.innerHTML += questionCard;
});

qsa('.options > span').forEach((span) => {
  var wrongIc = span.closest('.card').querySelector('.icon.wrong');
  var rightIc = span.closest('.card').querySelector('.icon.right');

  span.onclick = () => {
    if (span.hasAttribute('right')) {
      console.log('Right answer');
      rightIc.classList.add('visible');
      wrongIc.classList.remove('visible');
    } else {
      console.log('Wrong answer');
      span.closest('.card').querySelector('.icon.right').classList.remove('visible');
      if (wrongIc.classList.contains('visible')) {
        wrongIc.classList.remove('visible');
        setTimeout(() => {
          wrongIc.classList.add('visible');
        }, 310);
      } else {
        wrongIc.classList.add('visible');
      }
    }
  }
});
