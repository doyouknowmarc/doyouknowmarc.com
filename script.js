"use strict";
const introUrl = window.MARC_SITE?.introVideoUrl?.trim();
if (introUrl) {
  try {
    const url = new URL(introUrl);
    if (url.protocol === 'https:') document.getElementById('intro-video-link').href = url.href;
  } catch { /* Keep the existing working introduction link. */ }
}
const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-kind]')];
filters.forEach(button => button.addEventListener('click', () => {
  const kind = button.dataset.filter;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  cards.forEach(card => {
    card.hidden = kind !== 'all' && card.dataset.kind !== kind;
    if (!card.hidden) count++;
  });
  document.getElementById('filter-status').textContent = kind === 'all' ? `${count} things to explore` : `${count} ${kind === 'video' ? 'videos' : 'posts'} to explore`;
}));
