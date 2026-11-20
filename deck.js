// Fanned, swipeable card deck. Drag or swipe the front card, use the arrow
// buttons or the keyboard; a click without a drag opens the card's link.
document.querySelectorAll('[data-deck]').forEach((deck) => {
  const wrap = deck.parentElement;
  const cards = [...deck.querySelectorAll('.deck-card')];
  const count = wrap.querySelector('[data-deck-count]');
  const n = cards.length;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let front = 0;
  let drag = null;

  const layout = (dx = 0) => {
    cards.forEach((card, i) => {
      const real = (i - front + n) % n; // 0 = front
      const visible = real < 4;
      const pos = Math.min(real, 3); // park hidden cards behind the last visible one
      const x = pos === 0 ? dx : pos * 26;
      const rot = pos === 0 ? dx / 18 : pos * 3.5;
      card.style.transform = `translate(${x}px, ${pos * -10}px) rotate(${rot}deg) scale(${1 - pos * 0.05})`;
      card.style.zIndex = n - real;
      card.style.opacity = visible ? 1 - real * 0.12 : 0;
      card.style.pointerEvents = real === 0 ? 'auto' : 'none';
      card.tabIndex = real === 0 ? 0 : -1;
      card.setAttribute('aria-hidden', real === 0 ? 'false' : 'true');
      card.classList.toggle('is-front', real === 0);
    });
    count.textContent = `${front + 1} / ${n}`;
  };

  const go = (step) => {
    front = (front + step + n) % n;
    layout();
  };

  wrap.querySelector('[data-deck-prev]').addEventListener('click', () => go(-1));
  wrap.querySelector('[data-deck-next]').addEventListener('click', () => go(1));
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
  });

  deck.addEventListener('pointerdown', (e) => {
    const card = e.target.closest('.deck-card.is-front');
    if (!card) return;
    drag = { x: e.clientX, dx: 0, moved: false, id: e.pointerId };
    deck.classList.add('is-dragging');
  });
  deck.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.dx = e.clientX - drag.x;
    if (Math.abs(drag.dx) > 6 && !drag.moved) {
      drag.moved = true;
      deck.setPointerCapture(e.pointerId);
    }
    if (drag.moved) layout(drag.dx);
  });
  const end = () => {
    if (!drag) return;
    deck.classList.remove('is-dragging');
    const { dx, moved } = drag;
    deck.dataset.justDragged = moved ? '1' : '';
    drag = null;
    if (moved && Math.abs(dx) > 70) go(dx < 0 ? 1 : -1);
    else layout();
  };
  deck.addEventListener('pointerup', end);
  deck.addEventListener('pointercancel', end);
  deck.addEventListener('click', (e) => {
    if (deck.dataset.justDragged) { e.preventDefault(); deck.dataset.justDragged = ''; }
  }, true);

  if (reduce) deck.classList.add('no-motion');
  layout();
});
