# Marc Kroll — personal portfolio

Live: https://doyouknowmarc.com/
Source: https://github.com/doyouknowmarc/doyouknowmarc.com

A minimal black-and-white portfolio with real project imagery, talk and video previews, a filterable content library, and teaching/community experience. Plain HTML, CSS and JavaScript; no build step, packages, remote font dependencies or analytics.

## Content

- `index.html`: public copy, twelve project cards (the four originals plus Write, Audio Cut, ShortsPilot, Typing on Top, Talking on Top, Souls, WebCompare and ConsentKit, each with a screenshot of its live page), the featured talks with the MARC hackathon demo beside them, and eleven library cards.
- `styles.css`: monochrome palette, serif headings, responsive layouts and grayscale image presentation. Original bundled image files retain their colour, which is revealed on card hover and keyboard focus.
- `script.js`: accessible Everything / Videos / Posts filtering, and an optional hero introduction link.
- `site-config.js`: introduction-video URL, empty for now (the hero button was removed with the Codex Ambassador video). To bring it back, add the button with `id="intro-video-link"` to the hero and set the URL.
- `assets/media/`: real supplied-video thumbnails, LinkedIn previews, the public Sensei screenshot and an existing screenshot of Marc’s Teleprompter app.
- `media-sources.json`: media provenance. A generic LinkedIn logo preview was deliberately excluded.

The Teleprompter repository is private, so the page includes its screenshot and description without linking to its repository. No confidential company materials, private event access details or referral information are included. Some OpenAI posts are explicitly identified as shared updates. The upcoming November 2026 workshop remains labelled planned with estimated attendance. Cutmap is first place; Sensei is second place.

## Local preview

From this folder, run `python3 -m http.server 8322 --bind 127.0.0.1` and open http://127.0.0.1:8322/.

## Deployment

Push to `main`. The included `.github/workflows/pages.yml` deploys through GitHub Pages. Source must remain at the repository root, with index.html alongside styles.css and assets/.

The custom domain is configured in GitHub Pages settings. Cloudflare has four DNS-only apex A records pointing to GitHub Pages and a DNS-only www CNAME to doyouknowmarc.github.io. HTTPS certificate issuance was verified and HTTPS enforcement enabled. This Actions-based deployment does not require a CNAME file.

## Media and privacy

Images are bundled locally; visitors do not contact YouTube or LinkedIn to load previews. Videos and posts open only when a visitor follows a link. There are no autoplay players. Image alt text, reduced-motion preferences, keyboard focus and filter status announcements are included. No external account, cookie or third-party script is required to view the portfolio.

## Privacy and consent

One privacy choice covers doyouknowmarc.com and every subdomain. `assets/consent/dykm-consent.js` (built on [ConsentKit](https://consentkit.doyouknowmarc.com/)) is loaded by this site and by the apps:

```html
<script type="module" src="https://doyouknowmarc.com/assets/consent/dykm-consent.js"></script>
```

- **Visit statistics:** Cloudflare Web Analytics, loaded only after consent. Cloudflare's automatic injection must stay off for the zone, or the beacon loads regardless.
- **YouTube:** thumbnail links to YouTube open an in-page player; youtube-nocookie.com loads only after the visitor allows YouTube or picks "Play once". Thumbnails stay self-hosted.
- The choice lives in one first-party cookie, `dykm-consent`, on `.doyouknowmarc.com` (one year). "Privacy settings" in the footer (or a small floating button on the apps) reopens it.
- GitHub Pages serves the files with `Access-Control-Allow-Origin: *`, so subdomains can import them.

To update ConsentKit: `npm run build` in the CookieBanner repo, then copy `dist/consent-kit.js` and `dist/consent-kit.css` to `assets/consent/`.
