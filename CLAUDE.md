# MVC Gateway — Agent Instructions

**Source of truth:** `README.md` (role, tech stack, components), `ARCHITECTURE.md`, `DESIGN.md`.

Landing page and routing gateway for `mechanicalvisioncorp.com`. Owns the Vercel rewrites that stitch the multi-zone setup together (`/aerovision/*` → aerovision-mvp, `/pitch/*` → seed deck) and the domain redirects (`mechavisioncorp.com`, `mechanicalvision.ai` → main domain).

## Critical Rules (don't violate)

- **Next.js 15 only.** v16 breaks the multi-zone rewrites. Blast radius is bigger than this repo: a bad deploy here takes down routing for the product app and the pitch deck too.
- **Never push directly to `main`.** It auto-deploys to production via Vercel. Use PRs.
- **Run `/Users/jake/bin/mvc-doctor.sh`** before any build, deploy, or merge work.
- **Never store or serve investor-deck PDFs from this repo.** Cached deck binaries can silently drift from the Seed Deck app. The canonical `/pitch` routes are the only source of truth, and every recipient PDF must be freshly exported from the selected live route. `npm run check:deck-source-of-truth` enforces this rule.
- **Staff-only pages need Google sign-in.** `/control-room`, `/control-room-architecture.html`, and every deck under `/pitch` are gated by `middleware.ts` to the Machinist Google Workspace (@mechanicalvisioncorp.com). The seed deck checks the same cookie, so `lib/staff-session.ts` must stay identical in both repos (shared test vector in `tests/staff-session.test.mjs`). Add any new internal page to the middleware matcher. Local: `npm run dev:open` skips the gate.
- **Marketing copy follows the product language:** glasses observe, mechanic just does the job — never "narrates". Writing style rules apply (no em dashes, no semicolons, no buzzwords — see `~/AGENTS.md` → Writing Style Rules).
- **iCloud guardrail:** canonical root is `/Users/jake/dev/Primary_OIR/MVC/mvc-gateway`. If the path resolves under `~/Desktop` or `~/Documents`, run `/Users/jake/bin/repo-preflight-icloud.sh <repo-path>` first.

## Commands

```bash
npm run dev               # Dev server
npm run lint              # Fast gate
npm run build             # Production build
npm run test              # Staff sign-in tests (node --test)
npm run validate:fast     # = checks + tests + lint
npm run validate:release  # = validate:fast + build
```

## Related Projects

- **`aerovision-mvp`** — product app + API, served under `/aerovision` via this gateway's rewrites
- **`aerovision-seed-deck`** — investor pitch, served under `/pitch`
