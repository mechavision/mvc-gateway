# Archived website (2026-10-21)

On 2026-10-21 machinist.co became a Coming Soon page. Everything that page no
longer uses was moved here unchanged, so it can come back later.

What is here:

- `app/page.tsx`: the full old homepage (hero, Opportunity, Why Now, Approach,
  Wasted Hours ticker, What If scroll, closing CTA, footer).
- `app/field-notes/`: the Field Notes index and all six articles.
- `components/`: the components only those pages used (navbar, scroll reveal,
  count-up, video background, What If scroll, Wasted Hours ticker, and more).
- `public/`: the media only those pages used (Why Now video and photo, Field
  Notes image).

This folder is not built or deployed. `tsconfig.json` and `eslint.config.mjs`
both ignore `archive/`.

What stayed live: `/pitch/*` decks, `/robots`, `/aerovision/*` (product app),
`/brief/*`, `/control-room`, `/legal/*`. While archived, `/field-notes` and
every article URL redirect to the homepage (temporary 307, set in
`next.config.ts`).

## How to restore

1. Move each folder back to the same path at the repo root (`app/page.tsx`,
   `app/field-notes/`, `components/*.tsx`, `public/*`).
2. Remove the two `/field-notes` redirects from `next.config.ts`.
3. Put `'href="/aerovision/dashboard"'` back in the required list in
   `scripts/check-rebrand-preservation.mjs`.
4. Change the headline in `app/opengraph-image.tsx` back to
   "Free the Hands That Build."

The commit before this change is also the exact restore point in git history.
