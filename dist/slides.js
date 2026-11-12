(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  const previous = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const progress = document.querySelector('#progress');
  const count = document.querySelector('#count');
  const title = document.querySelector('#slideTitle');
  let index = 0;

  function readHash() {
    const match = location.hash.match(/^#(\d+)$/);
    if (!match) return 0;
    return Math.min(slides.length - 1, Math.max(0, Number(match[1]) - 1));
  }

  function show(nextIndex, updateHash = true) {
    index = Math.min(slides.length - 1, Math.max(0, nextIndex));
    slides.forEach((slide, position) => {
      const active = position === index;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    count.textContent = `${index + 1} / ${slides.length}`;
    title.textContent = slides[index].dataset.title;
    document.title = `${index + 1}. ${slides[index].dataset.title}｜AI 幻覺教學簡報`;
    if (updateHash) history.replaceState(null, '', `#${index + 1}`);
    slides[index].focus({ preventScroll: true });
  }

  slides.forEach((slide) => { slide.tabIndex = -1; });
  previous.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  addEventListener('keydown', (event) => {
    if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); show(index + 1); }
    if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); show(index - 1); }
    if (event.key === 'Home') { event.preventDefault(); show(0); }
    if (event.key === 'End') { event.preventDefault(); show(slides.length - 1); }
  });
  addEventListener('hashchange', () => show(readHash(), false));
  show(readHash(), false);
})();
