let sidebar = document.querySelector('.sidebar');
let openerBtn = document.querySelector('.sidebar .opener');

openerBtn.addEventListener('click', () => {
  if (sidebar.classList.contains('opened')) {
    sidebar.classList.remove('opened');
  } else {
    sidebar.classList.add('opened');
  }
});

let dimmer = document.querySelector('.dimmer');
let imageViews = document.querySelectorAll('.imageview');
let rollback = (el) => {
  el.removeAttribute('style');
  document.body.style.removeProperty('overflow');

  dimmer.style.removeProperty('z-index');
  dimmer.classList.remove('visible');
}

dimmer.addEventListener('click', () => {
  imageViews.forEach((el) => rollback(el));
});

imageViews.forEach((el) => {
  el.addEventListener('click', () => {
    if (!el.hasAttribute('style')) {
      el.style.zIndex = '999';
      dimmer.style.zIndex = '998';

      dimmer.classList.add('visible');

      let bRect = el.getBoundingClientRect();

      let windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      let windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      el.style.transform = `translate(${((windowWidth / 2) - bRect.x) - (bRect.width / 2)}px, ${((windowHeight / 2) - bRect.y) - (bRect.height / 2)}px) scale(${Math.min(windowHeight / bRect.height, windowWidth / bRect.width)})`;

      el.style.marginLeft = '0';
      document.body.style.overflow = 'hidden';
    } else {
      rollback(el);
    }
  });

  el.addEventListener('transitionend', () => {
    if (getComputedStyle(el).transform === 'none') {
      el.style.removeProperty('z-index');
    }
  });
});
