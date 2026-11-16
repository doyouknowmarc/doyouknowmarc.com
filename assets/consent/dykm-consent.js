// One privacy choice for doyouknowmarc.com and all its subdomains, built on ConsentKit
// (https://consentkit.doyouknowmarc.com). Include on any page with:
//   <script type="module" src="https://doyouknowmarc.com/assets/consent/dykm-consent.js"></script>
// Optional services:
//   - Statistics: Cloudflare Web Analytics (cookieless visit counts), loaded only after consent
//   - YouTube: video thumbnail links open an in-page player, youtube-nocookie.com only after consent
// The choice is stored in one first-party cookie on .doyouknowmarc.com.
import { Consent } from './consent-kit.js';

const CF_TOKEN = '92a9ab52cb2e4cdc9d968f7913f05280';
const YT = /^(https:\/\/(www\.)?youtube\.com\/(watch|shorts\/)|https:\/\/youtu\.be\/)/;

for (const file of ['consent-kit.css', 'site.css']) {
  const href = new URL(file, import.meta.url).href;
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = Object.assign(document.createElement('link'), { rel: 'stylesheet', href });
    document.head.append(link);
  }
}

Consent.init({
  version: 2,
  locale: 'en',
  storageKey: 'dykm-consent',
  cookieDomain: '.doyouknowmarc.com',
  expirationDays: 365,
  categories: { analytics: true, marketing: false, externalMedia: true },
  translations: {
    bannerTitle: 'Your privacy choice',
    bannerDescription: 'No ads and no tracking cookies. Two optional services: cookieless visit statistics by Cloudflare, and YouTube for videos. Both receive your IP address. Your choice counts for all doyouknowmarc.com sites.',
    acceptAll: 'Allow both',
    reject: 'Only necessary',
    preferences: 'Choose',
    modalTitle: 'Privacy settings',
    modalDescription: 'Choose what doyouknowmarc.com and its apps may load. You can change this any time with “Privacy settings”. Built with <a href="https://consentkit.doyouknowmarc.com/">ConsentKit</a>.',
    rejectAll: 'Only necessary',
    cookieSettings: 'Privacy settings',
    categories: {
      necessary: {
        title: 'Necessary',
        description: 'One first-party cookie (dykm-consent) that remembers this choice for a year. Nothing else.'
      },
      analytics: {
        title: 'Visit statistics',
        description: 'Cloudflare Web Analytics counts page views without cookies or profiles. Cloudflare receives your IP address and browser details. Switching it off takes effect from the next page.'
      },
      externalMedia: {
        title: 'YouTube videos',
        description: 'Plays videos on the page through youtube-nocookie.com. YouTube (Google) receives your IP address and may store data in your browser.'
      }
    },
    youtubeMessage: 'This video is hosted by YouTube. Playing it here connects to YouTube (Google), which receives your IP address and may store data in your browser.',
    allowOnce: 'Play once',
    alwaysAllow: 'Always allow YouTube',
    openOnYouTube: 'Watch on youtube.com ↗'
  }
});

/* ---- statistics: Cloudflare Web Analytics only with consent ---- */
const hadAnalytics = Consent.has('analytics');
Consent.whenGranted('analytics', () => {
  Consent.loadScriptIfConsent('analytics', 'https://static.cloudflareinsights.com/beacon.min.js', {
    id: 'cf-beacon',
    defer: true,
    attributes: { 'data-cf-beacon': JSON.stringify({ token: CF_TOKEN, spa: true }) }
  }).catch(() => {});
});
window.addEventListener('consentChanged', event => {
  // a running beacon can't be unloaded: reload so withdrawal applies right away
  if (hadAnalytics && !event.detail.consent.analytics) location.reload();
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
  holder.dataset.thumbnail = img.currentSrc || img.src;   // the site's own copy, never i.ytimg.com
  frame.replaceChildren(holder);
  d.showModal();
  Consent.refresh();
});
