# tadeo-rios-davila.com — static site

Ready-to-deploy static version of the site, migrated off Squarespace.

## Structure

```
site/
├── index.html                 → home page ("/")
├── films/index.html           → "/films"
├── installations/index.html   → "/installations"
├── research/index.html        → "/research"
├── about/index.html           → "/about"
└── assets/
    ├── site-transition.css    → shared: black background + fade overlay styles
    └── site-transition.js     → shared: fade-out-on-navigate behavior
```

Each page is now a fully standalone HTML document (its own `<head>`, fonts,
styles, and scripts) — nothing relies on a host template anymore.

## What changed from the Squarespace version

- **Fonts**: the `<link>` tags for Google Fonts now live in each page's
  `<head>`, where they belong, instead of inline in the body.
- **Mercury/AJAX plumbing removed**: the films and installations scripts no
  longer have the teardown-guard / `mercury:load` listener pattern. That
  existed only because Squarespace swaps page content in via AJAX without a
  real reload. On a plain static site every navigation is a real page load,
  so the scripts are just a plain `DOMContentLoaded` listener now — simpler,
  and one less category of bug.
- **Page transition**: the old Header Code Injection snippet is now
  `assets/site-transition.css` + `.js`, linked from every page.

## What still needs your attention

- **`about/index.html`** still has placeholder contact links —
  `YOUR-EMAIL`, `YOUR-INSTAGRAM-URL`, `YOUR-CV-URL` — swap those for the
  real ones.
- **`about/index.html`** biography/practice text is still placeholder copy.
- **`research/index.html`** has two entries marked "Description coming
  soon" — same as before, just carried over as-is.
- **The Unity installation** (`CATCHING YAWNS FROM ONE ANOTHER`) still
  points at `https://catchingyawnsgallery.netlify.app/` — that's a
  separate, already-working Netlify deployment, so it doesn't need to move.
  You could later fold it into this same site under e.g.
  `/installations/catching-yawns/`, but there's no need to do that now.
- **`STATION TO STATION`** still has placeholder video/still URLs from the
  original file — those were already placeholders before the migration.

## Deploying

See the step-by-step in chat for the full walkthrough. Short version:

1. Drag this whole `site` folder onto https://app.netlify.com/drop for an
   instant live URL, **or** push it to a GitHub repo and connect that repo
   to Netlify for auto-deploys on every push.
2. In Netlify → Domain management, add your custom domain and follow the
   DNS instructions Netlify gives you.
3. Test everything on the live domain before cancelling/downgrading
   Squarespace.
