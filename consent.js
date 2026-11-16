// Privacy consent for doyouknowmarc.com, built on ConsentKit (consentkit.doyouknowmarc.com).
// The site itself has no analytics and no tracking. The only optional service is YouTube:
// video cards stay plain links until a visitor allows "External media" (or "Play once").
import { Consent } from './assets/consent/consent-kit.js';

const YT = /^(https:\/\/(www\.)?youtube\.com\/(watch|shorts\/)|https:\/\/youtu\.be\/)/;
// Only pages with playable video cards need to ask; elsewhere the footer link is enough.
const hasVideoCards = [...document.querySelectorAll('a[href] img')].some(img => YT.test(img.closest('a').href));

Consent.init({
  version: 1,
  locale: 'en',
  storageKey: 'dykm-consent',
  expirationDays: 365,
  categories: { analytics: false, marketing: false, externalMedia: true },
  autoShowBanner: hasVideoCards,
  autoInjectFooterLink: false,   // the footer has its own "Privacy settings" link
  translations: {
    bannerTitle: 'Videos from YouTube',
    bannerDescription: 'This site has no analytics and no tracking. The videos are hosted by YouTube: once one plays here, YouTube receives your IP address and may store data in your browser. Allow it to watch videos on this page, or keep them as plain links to youtube.com.',
    acceptAll: 'Allow YouTube',
    reject: 'Only necessary',
    preferences: 'Settings',
    modalTitle: 'Privacy settings',
    modalDescription: 'Choose what this site may load. You can change this any time with “Privacy settings” at the bottom of the page. Built with <a href="https://consentkit.doyouknowmarc.com/">ConsentKit</a>.',
    rejectAll: 'Only necessary',
    categories: {
      necessary: {
        title: 'Necessary',
        description: 'Remembers this choice in your browser’s local storage. No cookies, nothing sent anywhere.'
      },
      externalMedia: {
        title: 'YouTube videos',
        description: 'Plays videos on this page through youtube-nocookie.com. YouTube (Google) receives your IP address and may store data in your browser.'
      }
    },
    youtubeMessage: 'This video is hosted by YouTube. Playing it here connects to YouTube (Google), which receives your IP address and may store data in your browser.',
    allowOnce: 'Play once',
    alwaysAllow: 'Always allow YouTube',
    openOnYouTube: 'Watch on youtube.com ↗'
  }
});

/* ---- video cards: play in a dialog instead of leaving the site ---- */
let dialog;

function playerDialog() {
  if (dialog) return dialog;
  dialog = document.createElement('dialog');
  dialog.className = 'yt-dialog';
  dialog.setAttribute('aria-label', 'Video');
  dialog.innerHTML = '<button class="yt-close" type="button" aria-label="Close video">×</button><div class="yt-frame"></div>';
  dialog.querySelector('.yt-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });   // backdrop
  dialog.addEventListener('close', () => { dialog.querySelector('.yt-frame').replaceChildren(); });   // stops playback
  document.body.append(dialog);
  return dialog;
}

document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href]');
  if (!link || !YT.test(link.href) || !link.querySelector('img')) return;   // only thumbnail cards, not text links
  event.preventDefault();
  const img = link.querySelector('img');
  const d = playerDialog();
  const frame = d.querySelector('.yt-frame');
  frame.classList.toggle('portrait', link.href.includes('/shorts/'));
  const holder = document.createElement('div');
  holder.className = 'ck-youtube';
  holder.dataset.youtubeUrl = link.href;
  holder.dataset.title = link.getAttribute('aria-label') || img.alt || 'YouTube video';
  holder.dataset.thumbnail = img.currentSrc || img.src;   // our own copy, never i.ytimg.com
  frame.replaceChildren(holder);
  d.showModal();
  Consent.refresh();
});
