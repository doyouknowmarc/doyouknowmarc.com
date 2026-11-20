# Positioning proposal: "AI you control"

Draft on branch `draft/positioning-control`. Based on the two recorded conversations (IMG_6183, IMG_6184). Delete this file, the draft banner, the `noindex` tag and every `mark.confirm` highlight before merging.

## What the conversations say

1. **The headline is pleasant but says nothing about value.** "I build with AI. And bring people along" could describe thousands of people. Proof is missing: engineering background, IBM, Doxis, production responsibility.
2. **Your real differentiator is production experience with data that must not leak.** Many people build tools. Few have been responsible for AI in production on health and safety data, with offline models, for large enterprise customers.
3. **The thread through everything is control.** Write, Audio Cut, Transkripta, Typing/Talking on Top and the toolkit keep files on the device. ConsentKit blocks tracking. OwnYourName is control over how you're found. Most tools let you connect your own or a local model. That's unusual, and it's the message.
4. **"Robin Hood": bring what large companies and frontier labs have to small businesses and individuals, and give them control back.** It fits who you are, so you don't have to pretend.
5. **Write in the customer's words, not yours.** Nobody says "demystify technology". They say: "I want it to work", "I want us to be safe", "I want my team to actually use it", "We're falling behind".
6. **Don't split fun and professional projects.** Visitors only ask "what's useful for me?" Group by who it helps.
7. **Target:** anywhere compliance, data protection, legal or competitive advantage matters. The DACH data-protection mindset is an advantage.
8. **Social proof beats self-description.** Don't call yourself an expert. Collect two or three convincing voices (short video interviews with a script), with context on who they are. Backlinks from their sites help the Knowledge Panel.
9. **Show the models you work with** (logos), and use the local-LLM videos as proof.
10. **Naming:** the domain matters less than what people find. Keep `doyouknowmarc.com` and "Marc Kroll" for now; decide on a different name only once the positioning is settled.

## What the draft changes

| Area | Now | Draft |
|---|---|---|
| Title / H1 | "I build with AI. And bring people along." | "AI you control. Data that stays yours." |
| Intro | Tools, workshops, community | Production experience on sensitive data, now for small businesses, teams and creators |
| Proof strip | "Builder & educator", 56 members, podiums | Doxis role + scale, Solution Architect, IBM, 56 members, podiums |
| New: "What clients tell me" | none | Four customer-language needs, each linking to the proof |
| New: "Bring your own AI" | none | Whisper, Ollama, llama.cpp, MLX, Kokoro, Apple Vision (logos later) |
| Projects | "Selected work", one flat grid | "Tools you can use today", grouped by who it helps, with data-handling badges |
| New: "In other people's words" | none | Three testimonial slots (to collect) |
| Talks spotlight | Top of page | Moved into "Workshops & talks" |
| Library | "Watch & read" middle of page | "Learn", near the end |
| Nav | About · Projects · Watch & read · Speaking & workshops | About · How I help · Tools · Workshops & talks · Learn |
| Contact | "Have an idea?" | "Want AI that stays in your house?" |
| JSON-LD | Generic description | Adds local AI and data protection to `description` and `knowsAbout` |

Tool groups:
- **Your files stay with you:** Write, Audio Cut, Transkripta, Talking on Top, Typing on Top, self-evolving toolkit
- **Be found on your terms:** OwnYourName, ConsentKit, WebCompare
- **Knowledge that stays in the team:** Sensei, Teleprompter
- **For creators and builders:** ShortsPilot, Cutmap & Beard Map, PortWatch, SpaceScreens, Souls

## Needs your input (highlighted in yellow on the page)

- What you're allowed to say about Doxis customers (largest energy suppliers? military?) and data volumes. Keep it identical everywhere (site, LinkedIn, About).
- Whether the toolkit (OCR, QR, background remover) really runs entirely in the browser, and what OwnYourName does with entered names.
- The three testimonials: names, permission, wording about their companies.
- Whether to show model logos (trademark rules differ; names in text are safe).

## Not done yet

- The About page and LinkedIn headline still use the old positioning.
- Two groups have an odd number of cards, so the grid leaves one empty slot.
- Checked at desktop width and in a 375 px phone viewport; no horizontal overflow.

## Hero variants (round 2)

"AI you control" names the theme but not the benefit. The visitor's gain is getting what AI offers without the risk to their data. Each variant states that from a different angle, in a split layout with the copy on the left. Switch between them with the buttons in the draft banner or `?hero=1|2|3`.

1. **Big-company AI** · "The AI big companies use. Without handing over your data." The Robin Hood framing: enterprise know-how, now for smaller teams. Grayscale portrait, three proof figures under the copy.
2. **Team + data** · "Your team working with AI. Your data staying in the building." Leads with the outcome for a business owner and names the DACH audience. Colour portrait with three floating proof badges, plus a checklist.
3. **Private tools** · "Private AI that works on your own machines." Leads with the product proof, with three tool screenshots on the right. Strongest for creators and individuals, weakest for the workshop business.

My pick is 1 for the headline, with the floating proof badges from 2. Variant 1 repeats Doxis and the 56 members from the proof strip below it; if you pick it, the strip should shrink or go.
