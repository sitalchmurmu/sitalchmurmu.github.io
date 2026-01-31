const grades = [6, 7, 8, 9, 10, 'all'];
const container = document.querySelector('.container');
const parser = new DOMParser();

const parse = (html) => {
  return parser.parseFromString(html, 'text/html').body.childNodes[0];
}

grades.forEach(grade => {
  container.appendChild(parse(`
    <a class="card" href="./start.html?class=${grade}">Class ${grade}</a>
  `));
});
