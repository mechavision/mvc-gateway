# MVC Gateway Architecture

## What This Repo Is

Think of the gateway as the front door and traffic cop for `mechanicalvisioncorp.com`.

It has two jobs:

1. Present the public-facing MVC story.
2. Route visitors to the right downstream app.

This repo should stay thin. It is not the product backend. It is not the investor deck app. It is the entry layer that makes the three-zone domain feel like one site.

## What This Repo Owns

- The landing page at `/`
- The print-first brief pages under `/brief`
- Domain canonicalization redirects
- Rewrites into MechaVision and the seed deck
- Shared marketing shell concerns like fonts, analytics, and page-level atmosphere

## What This Repo Does Not Own

- MechaVision authentication, dashboard, or APIs
- Seed deck application logic
- Investor-deck PDF binaries or cached deck exports
- Product data, AI pipelines, or database access

If a change starts to look like business logic, it is probably in the wrong repo.

## Multi-Zone Model

The public domain is split across three Next.js projects:

```text
mechanicalvisioncorp.com
  /                -> mvc-gateway
  /brief/*         -> mvc-gateway
  /aerovision/*    -> aerovision-mvp
  /pitch/*         -> aerovision-seed-deck
```

The gateway is the piece that makes those boundaries invisible to the visitor.

## Routing Responsibilities

`next.config.ts` is the real control plane in this repo.

It owns:

- staff sign-in for internal pages (see Staff Sign-In)
- host redirects from `mechavisioncorp.com` and `mechanicalvision.ai` to `mechanicalvisioncorp.com`
- `beforeFiles` rewrites for `/aerovision` and `/pitch`

That means routing changes are infrastructure changes, even if they look like small text edits.

## Request Flow

```text
Visitor hits mechanicalvisioncorp.com
  -> host redirect check
  -> path check
     -> /aerovision/* rewrites to deployed MechaVision app
     -> /pitch/* rewrites to deployed seed deck app
     -> everything else is served by the gateway itself
```

The gateway currently rewrites to the deployed Vercel project URLs, so if those project targets change, `next.config.ts` must change with them.

## Directory Map

```text
app/
  layout.tsx             Global fonts, analytics, shared shell
  globals.css            Landing-page design tokens and motion helpers
  page.tsx               Main marketing homepage
  brief/
    layout.tsx           Print-specific shell
    print.css            Letter-size and print rules
    overview/page.tsx    One-page overview brief
    how-it-works/page.tsx

components/
  navbar.tsx
  animated-grid.tsx
  scroll-reveal.tsx
  scroll-progress.tsx
  wasted-hours-ticker.tsx
  what-if-scroll.tsx
  brief/*                Print brief building blocks
```

## Two Visual Surfaces

This repo actually contains two presentation modes.

### 1. Cinematic Landing Page

This is the homepage.

- dark, high-contrast, narrative-driven
- scroll pacing matters
- heavier interactive pieces are lazy-loaded below the fold
- CTAs move the visitor into the product or the pitch deck

### 2. Print-First Briefs

These are the `/brief` routes.

- fixed letter-size pages
- controlled density
- optimized for web viewing and print
- no indexing by search engines

Treat them like branded handouts, not like normal website pages.

## Runtime Behavior

Most of the repo is simple server-rendered marketing content. A few pieces are intentionally client-side:

- navbar scroll state
- animated background grid
- reveal-on-scroll sections
- the wasted-hours ticker
- the "What If" cinematic scroll sequence

Heavy motion is pushed below the fold or lazy-loaded so the hero renders fast.

## Deployment Constraints

- This repo must stay on **Next.js 15** to remain compatible with the multi-zone rewrite setup.
- The gateway itself does not depend on backend product secrets.
- Vercel auto-deploys from `main`.

Because the gateway is thin, changes here should usually be low-risk. The exception is routing. Rewrites and redirects can break the whole domain if they are wrong.

## Ownership Boundaries

Keep these lines sharp:

- Gateway owns public messaging and navigation into the system.
- MechaVision owns the actual product experience.
- Seed deck owns investor storytelling.

The gateway can point people into those experiences, but it should not start recreating them locally.

### Deck export freshness

The live Seed Deck routes under `/pitch` are the only source of truth for
investor materials. The gateway must never store or serve a deck PDF because a
binary export can silently outlive changes to the deck's claims, ask, or slide
order. A recipient PDF must be freshly rendered from the selected live route
immediately before it is sent. `npm run check:deck-source-of-truth` blocks
cached deck PDFs and stale control-room download links from being reintroduced.

## Staff Sign-In

Some pages are for Machinist staff only: the control room, its architecture
page, and every deck under `/pitch` (Jake, 2026-10-22). Staff sign in with
their Machinist Google Workspace account.

```text
Visitor opens machinist.co/pitch/robots
  -> middleware.ts: signed mvc-staff-session cookie?
     yes -> continue (the /pitch rewrite forwards the cookie to the deck,
            which checks it again because its vercel.app address is public)
     no  -> /auth/google/start -> Google (ID-token flow)
            -> POST /auth/google/callback
            -> check Google's signature, audience, nonce, and hd claim
            -> set the 7-day cookie -> back to /pitch/robots
```

- There is no Google client secret. Trust comes from Google's RSA signature.
- `hd` (the Workspace's primary domain) decides who is staff, not the email
  text. A personal Gmail account has no `hd`.
- Sign-in only runs on machinist.co. Other hosts (including
  dev.mechanicalvisioncorp.com) are sent to the same path there first, because
  the cookie belongs to one host and Google only returns people to registered
  addresses.
- Roll-out order matters: set the same `STAFF_SESSION_SECRET` on both Vercel
  projects first, then ship the gateway, then the deck. A secret mismatch makes
  the deck send people back to sign-in over and over.
- Vercel settings: `STAFF_GOOGLE_CLIENT_ID` (a Web client whose authorized
  redirect URIs include `https://machinist.co/auth/google/callback`) and
  `STAFF_SESSION_SECRET` (same value on the aerovision-seed-deck project).

## Change Guardrails

- Keep routing logic centralized in `next.config.ts`.
- Keep the homepage focused on story and conversion, not feature sprawl.
- Keep `/brief` print-first. Do not turn it into a general CMS.
- When adding CTAs, point to the real downstream product surfaces instead of creating fake stand-ins here.
- Prefer lightweight interactions over heavy client-side complexity.

## Related Docs

- `DESIGN.md` is the visual system brief for future UI work in this repo.
- The MechaVision and seed deck repos own their own internal architecture.
