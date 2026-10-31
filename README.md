# Do you know Marc?

Published portfolio: https://doyouknowmarc.com/

Source: https://github.com/doyouknowmarc/doyouknowmarc.com

A responsive static portfolio for Marc. Plain HTML, CSS and a tiny optional-video script. No build step or dependencies. Works on GitHub Pages, including repository subpaths.

## Publish on GitHub Pages

1. Create a GitHub repository and push **the contents of this folder** to its `main` branch. Keep `index.html` at the repository root. Include the hidden `.github` folder and `.nojekyll` file.
2. In the repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Run the included **Deploy portfolio to GitHub Pages** workflow, or push another commit. The workflow shows your published URL.

You can also use **Deploy from a branch → main → /(root)** instead of the included workflow.

## Add the introduction video later

Edit `site-config.js` and set `introVideoUrl` to your shareable HTTPS video link. The page automatically reveals the introduction section. Until then, there is no empty video box on the public page. Videos are linked, not embedded, so players do not load until someone visits the video service.

## Custom domain: doyouknowmarc.com

The custom domain is assigned to this repository in GitHub Pages. Cloudflare DNS has four apex A records for GitHub Pages and a DNS-only `www` CNAME pointing to `doyouknowmarc.github.io`. The existing Cutmap record remains separate. The previous GitHub Pages domain assignment on `doyouknowmarc/home` was removed.

This repository uses a GitHub Actions publishing workflow. The custom-domain setting is managed in GitHub Pages settings; a CNAME file is not required for this publishing mode.

## Preview locally

From this folder:

```sh
python3 -m http.server 8322 --bind 127.0.0.1
```

Visit http://127.0.0.1:8322/.

## Editing

- `index.html`: all public copy, projects, experience and links.
- `styles.css`: colours, layout and responsive styles.
- `site-config.js`: optional introduction-video URL.
- `script.js`: shows the video section for a valid HTTPS link.

Fonts use Google Fonts with local system-font fallbacks. There is no analytics, contact form, account system or cookie storage.

## Content notes

Content is based on Marc's descriptions and supplied links. The HK Connect LinkedIn post and Sensei repository were accessible during preparation; not every linked video or post was independently reviewed. Generic video labels intentionally avoid guessing video contents. Awards are correctly attributed: **Cutmap first place; Sensei second place**. The Doxis AI Ambassador Award is an internal company award.

The November 2026 workshop is marked as planned, with estimated attendance. Update that description after the event. The website-builder pipeline is marked offline. Private event credentials, referral details, internal materials and application drafts are excluded from this public folder.

The supplied portrait is bundled at `assets/marc-portrait.png` and displayed in the hero section. Check any public-site legal disclosure requirements applicable to your use before publishing as a commercial site.
